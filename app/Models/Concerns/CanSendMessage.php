<?php

namespace App\Models\Concerns;

use App\Models\Message;
use App\Models\Thread;
use App\Models\User;

trait CanSendMessage
{
    public function sendMessageOn(Thread $thread, string $content)
    {
        $message = new Message();
        $message->content = $content;
        $message->user()->associate($this);
        $message->thread()->associate($thread);
        $message->save();
        return $message;
    }

    public static function sendMessageSupport(User $user, string $content)
    {
        $thread = $user->supportThread();
        return User::admin()->first()->sendMessageOn($thread, $content);
    }
}