<?php

namespace App\Models\Concerns;

use App\Contracts\Commentable;
use App\Models\Comment;

trait CanComment
{
    public function comment(Commentable $commentable, $content) : Comment
    {
        $comment = new Comment();
        $comment->content = $content;
        $comment->user()->associate($this);
        $comment->commentable()->associate($commentable);
        $comment->save();
        return $comment;
    }
}