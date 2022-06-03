<?php

namespace App\Listeners;

use App\Events\SupportMessageReceived;
use App\Services\Chatbot;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ChatbotListener implements ShouldQueue
{
    public $delay = 2;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Chatbot $bot)
    {
        $this->bot = $bot;
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\SupportMessageReceived  $event
     * @return void
     */
    public function handle(SupportMessageReceived $event)
    {
        $message = $event->message;
        if (!$message->user->is_admin) {
            $this->bot->handle($message);
        }
    }
}
