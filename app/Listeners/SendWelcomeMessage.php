<?php

namespace App\Listeners;

use App\Events\AlumniVerified;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendWelcomeMessage implements ShouldQueue
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
     * @param  \App\Events\AlumniVerified  $event
     * @return void
     */
    public function handle(AlumniVerified $event)
    {
        $user = $event->alumnus->user;
        User::sendMessageSupport($user, "Hello {$user->firstname}, Thanks for signing up.");
    }
}
