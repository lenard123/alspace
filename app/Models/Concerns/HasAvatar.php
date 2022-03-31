<?php

namespace App\Models\Concerns;

use App\Models\Image;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasAvatar
{
    public function avatar(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getAvatarUrlAttribute() : string
    {
        return $this->avatar->url;
    }

    public function regenerateAvatar() : void
    {
        //Delete if has avatar
        $this->avatar()->delete();

        //Generate new
        $name = strtolower(urlencode($this->fullname));
        $this->avatar()->create([
            'source' => 'url',
            'reference' => "https://avatars.dicebear.com/api/initials/$name.svg"
        ]);
    }
}