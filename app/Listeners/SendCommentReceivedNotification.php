<?php

namespace App\Listeners;

use App\Events\CommentReceived;
use App\Models\Post;
use App\Notifications\PostComment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendCommentReceivedNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CommentReceived  $event
     * @return void
     */
    public function handle(CommentReceived $event)
    {
        $comment = $event->comment;
        switch ($comment->commentable_type){
            case Post::class:
                $post = $comment->commentable;
                $author = $post->author;
                $author->notify(new PostComment($post, $comment));
                break;
        }
    }
}
