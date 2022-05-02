<?php

namespace App\Events;

use App\Models\PendingAlumni;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AlumniRegistered
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public PendingAlumni $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PendingAlumni $user)
    {
        $this->user = $user;

        Log::info("New user registered", compact('user'));
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
