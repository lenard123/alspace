<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ThreadController extends Controller
{
    public function view(Thread $thread)
    {
        $thread->messages()
            ->whereNot('user_id', Auth::id())
            ->update(['has_read' => true]);
        $thread->unread_messages_count = 0;
        return $thread->loadInfo(Auth::user());
    }

    public function sendMessage(Thread $thread, Request $request)
    {
        $message = Auth::user()->sendMessageOn($thread, $request->content);
        MessageSent::dispatch($message);
        return $message;
    }

    public function messages(Thread $thread)
    {
        return $thread->messages()->latest()->simplePaginate(10);    
    }

    public function supportThreads()
    {
        $user = Auth::user();

        return Thread::query()
            ->where('is_support', 1)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn($thread) => $thread->loadInfo($user))
            ->values();
    }
}
