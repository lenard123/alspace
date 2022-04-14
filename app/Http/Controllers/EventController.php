<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Services\ImageUploader;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function create(EventRequest $request)
    {
        $event = new Event();
        $event->fill($request->validated());
        $event->is_online = $request->has('is_online');
        $event->user()->associate($request->user());
        $event->save();

        if ($request->has('image')) {
            ImageUploader::upload($event, $request->file('image'), 'events');
        }

        return $event->load('cover');
    }

    public function interested(Event $event)
    {
        return Auth::user()->participateEvent($event, 'interested');
    }

    public function going(Event $event)
    {
        return Auth::user()->participateEvent($event, 'going');
    }

    public function notInterested(Event $event)
    {
        return Auth::user()->cancelParticipation($event);
    }

    public function index(Request $request)
    {
        $filter = $request->input('filter');
        $today = Carbon::today();

        $event = Event::select('*')
            ->when($filter === 'active', fn($q) => $q->where('start_at', '>=', $today))
            ->when($filter === 'past', fn($q) => $q->where('start_at', '<', $today))
            ->when($filter === 'hosting', fn($q) => $q->where('user_id', Auth::id())->latest())
            ->when(in_array($filter, ['interested', 'going']), function($q) use ($today, $filter) {
                $q->whereHas($filter, function($q) {
                    $q->where('user_id', Auth::id());
                })->where('start_at', '>=', $today);
            })
            ->orderBy('start_at', 'ASC')
            ->paginate(10);

        return $event;
    }
}
