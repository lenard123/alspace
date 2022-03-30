<?php

namespace App\Models;

use App\Contracts\Likeable;
use App\Models\Concerns\Likes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model implements Likeable
{
    use HasFactory, Likes;

    protected $fillable = ['user_id', 'content'];

    protected $with = ['author', 'likes'];

    protected $hidden = ['likes'];

    protected $appends = ['likerIds'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected function getLikerIdsAttribute()
    {
        return $this->likes->pluck('user_id');
    }
}
