<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    use HasFactory;

    protected $fillable = ['company', 'title', 'tags', 'description'];

    protected $with = ['user', 'image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable')->withDefault([
            'source' => 'null'
        ]);
    }

    public function getTagsAttribute()
    {
        return json_decode($this->attributes['tags']);
    }
}
