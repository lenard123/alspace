<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        return Auth::user()
            ->notifications()
            ->when(request('filter') === 'unread', fn ($q) => $q->where('read_at', null))
            ->latest()
            ->simplePaginate(10);
    }
}
