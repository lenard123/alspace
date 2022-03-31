<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function like(Comment $comment)
    {
        Auth::user()->like($comment);
        return response()->json(
            $comment->likes()->pluck('user_id')
        );
    }

    public function unlike(Comment $comment)
    {
        Auth::user()->unlike($comment);
        return response()->json(
            $comment->likes()->pluck('user_id')
        );
    }
}
