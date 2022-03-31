<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Contracts\Likeable;
use App\Models\Concerns\HasComments;
use App\Models\Concerns\Likes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model implements Likeable, Commentable
{
    use HasFactory, Likes, HasComments;

    protected $fillable = ['user_id', 'content'];

    protected $with = ['author', 'likes'];

    protected $withCount = ['comments'];

    protected $hidden = ['likes'];

    protected $appends = ['likerIds'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
