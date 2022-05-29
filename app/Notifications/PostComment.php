<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostComment extends Notification implements ShouldQueue
{
    use Queueable;

    private $post;
    private User $commenter;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Post $post, Comment $comment)
    {
        $this->post = $post;
        $this->commenter = $comment->user;
    }


    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }


    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'avatar' => $this->commenter->avatarUrl,
            'content' => $this->getContent(),
            'link' => "/posts/".$this->post->id,
            'post_id' => $this->post->id,
        ];
    }

    public function shouldSend($notifiable, $channel)
    {
        return $notifiable->id !== $this->commenter->id;
    }

    private function getContent()
    {
        $notifier = $this->commenter->fullname;
        $action = "commented on your post";
        $content = $this->post->content;

        return buildNotificationContent($notifier, $action, $content);
    }
}
