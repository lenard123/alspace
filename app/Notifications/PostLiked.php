<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class PostLiked extends Notification implements ShouldQueue
{
    use Queueable;


    protected $notifier_id;
    protected $post_id;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $liker, Post $post)
    {
        $this->notifier_id = $liker->id;
        $this->post_id = $post->id;
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
        return $notifiable->id === $this->notifier_id;
    }

    private function hasAlreadyNotified($notifiable)
    {
        return $notifiable->notifications()
            ->where('data', json_encode($this->toArray($notifiable)))
            ->where('type', static::class)
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
            'notifier_id' => $this->notifier_id,
            'post_id' => $this->post_id
        ];
    }
}
