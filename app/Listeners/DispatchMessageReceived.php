<?php

namespace App\Listeners;

use App\Events\MessageReceived;
use App\Events\MessageSent;
use App\Events\SupportMessageReceived;
use App\Models\Message;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class DispatchMessageReceived
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
     * @param  \App\Events\MessageSent  $event
     * @return void
     */
    public function handle(MessageSent $event)
    {
        $message = $event->message;
        $thread = $message->thread;

        $this->broadCastToMembers($thread, $message);
        $this->broadCastToAdmins($thread, $message);
    }

    private function broadCastToAdmins(Thread $thread, Message $message)
    {
        if (! $thread->is_support) return;
        SupportMessageReceived::dispatch($message);
    }

    private function broadCastToMembers(Thread $thread, Message $message)
    {
        $members_id = $thread->members()->pluck('id');
        $members_id->each(function($id) use ($message) {
            MessageReceived::dispatch($id, $message);
        });
    }
}
