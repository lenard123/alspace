<?php

namespace App\Http\Controllers;

use App\Models\TShirt;
use App\Models\TShirtRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TShirtController extends Controller
{

    public function index()
    {
        return TShirt::all();
    }

    public function available()
    {
        return TShirt::query()->available()->get();
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required|numeric',
            'availability' => 'required',
            'image' => 'required|image'
        ]);

        $tshirt = TShirt::create($request->only('title', 'price', 'availability'));
        $tshirt->updateImage($request->file('image'));

        return $tshirt;
    }

    public function createRequest(TShirt $tshirt, Request $request)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);

        if ( Auth::user()->hasPendingRequest($tshirt) ) {
            throw ValidationException::withMessages([
                'quantity' => 'You already have a pending request for this item.'
            ]);
        }

        $tshirt_request = new TShirtRequest();
        $tshirt_request->user()->associate(Auth::user());
        $tshirt_request->tshirt()->associate($tshirt);
        $tshirt_request->price = $tshirt->price;
        $tshirt_request->quantity = $request->quantity;
        $tshirt_request->status = 'PENDING';
        $tshirt_request->save();

        return $tshirt_request;
    }

    public function requests()
    {
        return Auth::user()->tshirtRequests;
    }

    public function requestsAll()
    {
        return TShirtRequest::query()
            ->with('user', 'tshirt')
            ->where('status', request()->get('filter', 'PENDING'))
            ->get();
    }

    public function updateStatus(Request $request, TShirtRequest $tshirt_request)
    {
        $tshirt_request->status = $request->status;
        $tshirt_request->save();
        
        return $tshirt_request;
    }
}
