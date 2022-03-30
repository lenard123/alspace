<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;

class PostController extends Controller
{

    public function index()
    {
        return Post::latest()->paginate(2);
    }

    public function create(PostRequest $postRequest)
    {
        $user = $postRequest->user();
        $post = $user->posts()->create($postRequest->validated());
        return $post;
    }
}
