<?php

namespace App\Models\Concerns;

use App\Models\Post;

trait CanPost
{
    public function post($data) : Post
    {
        $post = new Post();
        $post->author()->associate($this);
        $post->fill($data);
        $post->save();
        return $post;
    }
}