<?php

namespace App\Http\Controllers;

use App\Models\Message;

class MessageController extends Controller
{
    public function readMessage(Message $message)
    {
        abort_if($message->isSender(), 401);

        $message->markAsRead();

        return response()->noContent();
    }
}
