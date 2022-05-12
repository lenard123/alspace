<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PostLiked extends Notification implements ShouldQueue
{
    use Queueable;

    private $link;
    private $avatar;
    private $content;

    private $liker_id;
    private $post_id;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $liker, Post $post)
    {
        $this->liker_id = $liker->id;
        $this->post_id = $post->id;

        $this->link = "/posts/{$post->id}";
        $this->avatar = $liker->avatarUrl;
        $this->content = $this->buildContent($liker, $post);
    }

    private function buildContent(User $liker, Post $post)
    {
        $name = htmlspecialchars($liker->fullname);
        $content = htmlspecialchars(Str::limit($post->content, 60));
        return "<strong>{$name}</strong> like your post: \"{$content}\".";
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

    public function shouldSend($notifiable, $channel)
    {
        return !$this->isOwner($notifiable) && !$this->hasAlreadyNotified($notifiable);
    }

    private function isOwner($notifiable)
    {
        return $notifiable->id === $this->liker_id;
    }

    private function hasAlreadyNotified($notifiable)
    {
        return $notifiable->notifications()
            ->where('data->post_id', $this->post_id)
            ->exists();
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
            'avatar' => $this->avatar,
            'content' => $this->content,
            'link' => $this->link,
            'post_id' => $this->post_id,
        ];
    }
}
