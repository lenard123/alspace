<?php

namespace App\Models\Concerns;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\ImageUploader;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait CanPost
{

    public function posts() : HasMany
    {
        return $this->hasMany(Post::class);
    }

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