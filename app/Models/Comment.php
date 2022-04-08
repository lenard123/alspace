<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Contracts\Likeable;
use App\Models\Concerns\HasComments;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Likeable implements Commentable
{
    use HasFactory, HasComments;

    protected $fillable = ['content'];

    protected $with = ['user'];

    protected $withCount = ['likers', 'comments'];

    protected $appends = ['is_like'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentable()
    {
        return $this->morphTo();
    }
}
