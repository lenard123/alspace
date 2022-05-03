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

    public Alumnus $alumnus;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Alumnus $alumnus)
    {
        $this->alumnus = $alumnus;
        Log::info('Alumni verified', compact('alumnus')); 
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
