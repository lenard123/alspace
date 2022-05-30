<?php

namespace App\Http\Controllers;

use App\Models\TShirt;
use Illuminate\Http\Request;

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
}
