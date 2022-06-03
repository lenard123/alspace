<?php

namespace App\Services;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;

class Chatbot
{
    public function handle(Message $message)
    {
        $this->thread = $message->thread;
        if ($message->content === 'hello') {
            $this->reply('hi');
        }
    }

    private function reply($message)
    {
        $bot = $this->getBotUser();
        $bot->sendMessageOn($this->thread, $message);
    }

    private function getBotUser()
    {
        return User::admin()->where('role', 'super')->first();
    }
}