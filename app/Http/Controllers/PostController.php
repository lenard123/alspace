<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

    public function index()
    {
        return response()->json(Post::latest()->paginate(10));
    }

    public function view(Post $post)
    {
        $post->load('comments');
        return $post;
    }

    public function create(PostRequest $postRequest)
    {
        $user = $postRequest->user();
        $post = $user->posts()->create($postRequest->validated());
        return response()->json($post);
    }

    public function like(Post $post)
    {
        Auth::user()->like($post);
        return response()->json($post->likes()->pluck('user_id'));
    }

    public function unlike(Post $post)
    {
        Auth::user()->unlike($post);
        return response()->json($post->likes()->pluck('user_id'));
    }

    public function comment(Post $post, CommentRequest $request)
    {
        $comment = Auth::user()->comment($post, $request->content);
        return response()->json($comment);
    }
}
