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

    public function cover() : MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->withDefault([
                'source' => 'url',
                'reference' => static::DEFAULT_COVER,
            ]);
    }
}
