<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Contracts\Likeable;
use App\Models\Concerns\HasComments;
use App\Models\Concerns\Likes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Likeable implements Commentable
{
    use HasFactory, HasComments, SoftDeletes;

    protected $fillable = ['user_id', 'content'];

    protected $with = ['author', 'images'];

    protected $withCount = ['comments', 'likers'];

    protected $appends = ['is_like'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
