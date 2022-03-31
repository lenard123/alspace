<?php

namespace App\Models\Concerns;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasComments
{
    public function comments() : MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}