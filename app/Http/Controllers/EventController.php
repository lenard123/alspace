<?php

namespace App\Http\Controllers;

use App\Events\UserParticipateToEvent;
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
        $this->participate($event, 'interested');
        return $event;
    }
    

    public function going(Event $event)
    {
        $this->participate($event, 'going');
        return $event;
    }

    private function participate(Event $event, $status)
    {
        $user = Auth::user();
        $user->participateEvent($event, $status);
        UserParticipateToEvent::dispatch($user, $event, $status);
    }

    public function notInterested(Event $event)
    {
        return Auth::user()->cancelParticipation($event);
    }

    public function index(Request $request)
    {
        $filter = $request->input('filter');

        $event = Event::query()
            ->where($this->getScope($filter))
            ->orderBy('start_at', 'ASC')
            ->paginate(10);

        return $event;
    }

    public function all()
    {
        return Event::all();
    }

    function getScope($filter)
    {
        return match($filter) {
            'active' => fn($q) => $q->active(),
            'interested' => fn($q) => $q->interested(),
            'past' => fn($q) => $q->past(),
            'hosting' => fn($q) => $q->owned(),
            'going' => fn($q) => $q->going(),
            'pending' => fn($q) => $q->owned()->pending(),
            'require-approval' => fn($q) => $q->pending(),
            'cancelled' => fn($q) => $q->cancelled(),
        };
    }

    public function view(Event $event)
    {
        return $event->load('user');
    }

    public function participants(Event $event, Request $request)
    {
        $type = $request->get('type');
        switch ($type) {
            case 'interested': return $event->interested;
            case 'going': return $event->going;
            default: return $event->participants;
        }
    }

    public function approve(Event $event)
    {
        $event->status = 'approved';
        $event->save();
        return response()->noContent();
    }

    public function reject(Event $event)
    {
        $event->status = 'rejected';
        $event->save();
        return response()->noContent();
    }
}
