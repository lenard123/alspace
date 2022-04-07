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

        return $likeable->refresh();
    }

    public function hasLiked(Likeable $likeable): bool
    {
        if (! $likeable->exists) {
            return false;
        }

        return $likeable->likers()
            ->whereHas('user', fn($q) =>  $q->whereId($this->id))
            ->exists();
    }

}