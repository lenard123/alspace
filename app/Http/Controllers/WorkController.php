<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Illuminate\Http\Request;

class WorkController extends Controller
{

    public function create(Request $request)
    {
        $request->validate([
            'company' => 'required',
            'position' => 'required',
            'start_at' => 'required|date',
            'end_at' => 'nullable|date'
        ]);

        return Work::create(
            $request->only('company', 'position', 'start_at', 'end_at') + 
            ['user_id' => auth()->id()]
        );
    }

}
