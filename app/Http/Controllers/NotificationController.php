<?php

namespace App\Http\Controllers;

use App\Models\Notification;

class NotificationController extends Controller
{
    public function index()
    {
        return Notification::query()
            ->owned()
            ->when(request('filter') === 'unread', fn ($q) => $q->unread())
            ->latest()
            ->simplePaginate(10);
    }

    public function markAsRead(Notification $notification)
    {
        $notification->markAsRead();
        return response()->noContent();
    }

    public function markAllAsRead()
    {
        return Notification::query()
            ->owned()
            ->unread()
            ->update(['read_at' => now()]);
    }

    public function clear()
    {
        return Notification::query()
            ->owned()
            ->delete();
    }
}
