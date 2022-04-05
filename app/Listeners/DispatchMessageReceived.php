<?php

namespace App\Listeners;

use App\Events\MessageReceived;
use App\Events\MessageSent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
        $sender_id = $message->user_id;

        //Get all members on the thread and exclude the sender
        $members = $message->thread->members()->where('user_id', '<>', $sender_id)->get();

        //Dispatch MessageReceived event
        foreach($members as $member)
        {
            event(new MessageReceived($member->id, $message));
        }
    }
}
