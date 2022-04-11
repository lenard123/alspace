<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Services\ImageUploader;

class EventController extends Controller
{
    public function create(EventRequest $request)
    {
        $event = new Event();
        $event->fill($request->validated());
        $event->user()->associate($request->user());
        $event->save();

        if ($request->has('image')) {
            ImageUploader::upload($event, $request->file('image'), 'events');
        }

        return $event->load('cover');
    }
}
