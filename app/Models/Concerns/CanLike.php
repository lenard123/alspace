<?php

namespace App\Models\Concerns;

use App\Contracts\Likeable;
use App\Models\Like;

trait CanLike
{

    public function like(Likeable $likeable): Likeable
    {
        if ($this->hasLiked($likeable)) {
            return $likeable;
        }

        (new Like())
            ->user()->associate($this)
            ->likeable()->associate($likeable)
            ->save();

        $this->load('likes');

        return $likeable->refresh();
    }

    public function unlike(Likeable $likeable): Likeable
    {
        if (! $this->hasLiked($likeable)) {
            return $likeable;
        }

        $likeable->likers()
            ->whereHas('user', fn($q) => $q->whereId($this->id))
            ->delete();
        
        $this->load('likes');

        return $likeable->refresh();
    }

    public function hasLiked(Likeable $likeable): bool
    {
        if (! $likeable->exists) {
            return false;
        }

        return $this->likes
            ->where('likeable_id', $likeable->id)
            ->where('likeable_type', get_class($likeable))
            ->count() > 0;
    }

}