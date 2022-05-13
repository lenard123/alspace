<?php

namespace App\Models\Concerns;

use App\Models\Image;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasAvatar
{
    public function avatar(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('payload', 'avatar');
    }

    public function getAvatarUrlAttribute() : string
    {
        //Generate new
        $name = strtolower(urlencode($this->fullname));

        return $this->avatar?->url ?? "https://avatars.dicebear.com/api/initials/$name.svg";
    }
}