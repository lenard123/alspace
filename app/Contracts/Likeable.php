<?php

namespace App\Contracts;

use App\Models\Like;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

abstract class Likeable extends Model
{
    public function likers() : MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function isLike() : bool
    {
        if (Auth::check()) {
            return Auth::user()->hasLiked($this);
        }
        return false;
    }

    public function getIsLikeAttribute() : bool
    {
        return $this->isLike();
    }
}