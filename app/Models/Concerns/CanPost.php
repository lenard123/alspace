<?php

namespace App\Models\Concerns;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\ImageUploader;

trait CanPost
{
    public function post(PostRequest $request) : Post
    {
        $post = new Post();
        $post->author()->associate($this);
        $post->fill($request->validated());
        $post->save();

        if ($request->hasFile('images')){
            $uploads = $request->file('images');
            foreach ($uploads as $fileUpload) {
                ImageUploader::upload($post, $fileUpload, 'posts');
            }
        }

        return $post->load('images');
    }
}