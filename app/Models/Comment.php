<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Models\Concerns\HasComments;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model implements Commentable
{
    use HasFactory, HasComments;

    protected $fillable = ['content'];

    protected $hidden = ['commentable_id', 'commentable_type'];

    protected $with = ['user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentable()
    {
        return $this->morphTo();
    }
}
