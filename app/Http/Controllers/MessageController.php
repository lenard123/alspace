<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function readMessage(Message $message)
    {
        return Auth::user()->readMessage($message);
    }
}
