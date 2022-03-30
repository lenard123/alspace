<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function create(PostRequest $postRequest)
    {
        $user = $postRequest->user();
        $post = $user->posts()->create($postRequest->validated());
        return $post;
    }
}
