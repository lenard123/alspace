<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

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
        return Notification::owned()->unread()->count();
    }

    public function markAllAsRead()
    {
        $user = Auth::user();
        $user->markAllNotificationsAsRead();
        return $user->notifications()->unread()->count();
    }

    public function clear()
    {
        return Notification::query()
            ->owned()
            ->delete();
    }
}
