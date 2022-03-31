<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Contracts\Likeable;
use App\Models\Concerns\HasComments;
use App\Models\Concerns\Likes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model implements Commentable, Likeable
{
    use HasFactory, HasComments, Likes;

    protected $fillable = ['content'];

    protected $hidden = ['commentable_id', 'commentable_type', 'likes'];

    protected $with = ['user'];

    protected $appends = ['likerIds'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentable()
    {
        return $this->morphTo();
    }
}
