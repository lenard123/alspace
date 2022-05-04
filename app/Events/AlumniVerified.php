<?php

namespace App\Events;

use App\Models\Alumnus;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AlumniVerified
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $user_id;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(int $user_id)
    {
        $this->user_id = $user_id;
        Log::info('Alumni verified', compact('user_id')); 
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
