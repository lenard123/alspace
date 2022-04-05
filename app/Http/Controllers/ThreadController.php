<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{
    public function view(Thread $thread)
    {
        return $thread->loadInfo(Auth::user())->load('messages');
    }

    public function sendMessage(Thread $thread, Request $request)
    {
        $message = Auth::user()->sendMessageOn($thread, $request->content);
        MessageSent::dispatch($message);
        return $message;
    }
}
