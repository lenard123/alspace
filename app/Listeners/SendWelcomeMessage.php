<?php

namespace App\Listeners;

use App\Events\AlumniRegistered;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendWelcomeMessage
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
     * @param  \App\Events\AlumniRegistered  $event
     * @return void
     */
    public function handle(AlumniRegistered $event)
    {
        $user = $event->user;
        User::sendMessageSupport($user, "Hello {$user->firstname}, Thanks for signing up.");
    }
}
