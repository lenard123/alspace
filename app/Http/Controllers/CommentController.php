<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function like(Comment $comment)
    {        
        return Auth::user()->like($comment);
    }

    public function unlike(Comment $comment)
    {
        return Auth::user()->unlike($comment);
    }

    public function replies(Comment $comment)
    {
        return $comment->comments()->latest()->paginate(3);
    }

    public function reply(Comment $comment, Request $request)
    {
        return Auth::user()->comment($comment, $request->content);
    }
}
