<?php

namespace App\Models;

use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{

    public function scopeOwned($query)
    {
        return $query->where([
            'notifiable_type' => User::class,
            'notifiable_id' => auth()->id(),
        ]);
    }
}
