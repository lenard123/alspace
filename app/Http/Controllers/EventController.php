<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Services\ImageUploader;
use Carbon\Carbon;

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

    public function index(Request $request)
    {
        $filter = $request->input('filter');
        $today = Carbon::today();
        $event = Event::select('*')
            ->when($filter === 'active', fn($q) => $q->where('start_at', '>=', $today))
            ->when($filter === 'past', fn($q) => $q->where('start_at', '<', $today))
            ->paginate(10);

        return $event;
    }
}
