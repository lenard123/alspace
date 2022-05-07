<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Notifications\PostLiked;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class PostController extends Controller
{

    public function index()
    {
        return Post::latest()->simplePaginate(10);
    }

    public function view(Post $post)
    {
        return $post;
    }

    public function comments(Post $post)
    {
        return $post->comments()->latest()->simplePaginate(10);
    }

    public function create(PostRequest $request)
    {
        $this->authorize('create', Post::class);
        return $request->user()->post($request);
    }

    public function like(Post $post)
    {
        Notification::send($post->author, new PostLiked(Auth::user(), $post));
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
