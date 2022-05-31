<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'question' => 'required',
            'answer' => 'required'
        ]);

        return Question::create($request->only('question', 'answer'));
    }

    public function index()
    {
        return Question::all();
    }

    public function destroy(Question $question)
    {
        return $question->delete();
    }
}
