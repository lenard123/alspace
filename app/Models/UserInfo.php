<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class UserInfo extends Model
{
    use HasFactory;

    public const DEFAULT_COVER = 'https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq';

    protected $with = ['cover'];

    protected $appends = ['cover_url'];

    protected $hidden = ['cover'];

    public function cover() : MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('payload', 'cover')
            ->withDefault([
                'source' => 'url',
                'reference' => static::DEFAULT_COVER,
                'payload' => 'cover'
            ]);
    }

    public function getCoverUrlAttribute()
    {
        return $this->cover->url;
    }

    public function updateCover($cover)
    {
        if ( $this->id === null ) 
            $this->save();

        $this->cover->upload($cover, 'cover');

        return $this->cover;
    }
}
