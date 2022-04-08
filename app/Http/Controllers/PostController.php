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
        return response()->json(Post::latest()->paginate(8));
    }

    public function view(Post $post)
    {
        return $post;
    }

    public function comments(Post $post)
    {
        return $post->comments()->latest()->paginate(5);
    }

    public function create(PostRequest $postRequest)
    {
        $this->authorize('create', Post::class);
        $user = $postRequest->user();
        $post = $user->posts()->create($postRequest->validated());
        return response()->json($post);
    }

    public function like(Post $post)
    {
        return Auth::user()->like($post);
    }

    public function unlike(Post $post)
    {
        return Auth::user()->unlike($post);
    }

    public function comment(Post $post, CommentRequest $request)
    {
        return Auth::user()->comment($post, $request->content);
    }

    public function delete(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return 'Post deleted successfully';
    }
}
