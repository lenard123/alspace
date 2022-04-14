<?php

namespace App\Models\Concerns;

use App\Models\Event;

trait CanParticipateToEvents
{
    //Relationship
    public function hostingEvents()
    {
        return $this->hasMany(Event::class);
    }

    public function interestedEvents()
    {
        return $this->participatingEvents()
            ->wherePivot('status', 'interested');
    }

    public function goingEvents()
    {
        return $this->participatingEvents()
            ->wherePivot('status', 'going');
    }

    public function participatingEvents()
    {
        return $this->belongsToMany(Event::class, 'events_participants','user_id', 'event_id');
    }
    
    // Relationship Ids
    public function getInterestedEventIdsAttribute()
    {
        return $this->interestedEvents()->allRelatedIds();
    }

    public function getGoingEventIdsAttribute()
    {
        return $this->goingEvents()->allRelatedIds();
    }

    // Add Participants
    public function participateEvent(Event $event, $status) : Event
    {
        $event->participants()
            ->syncWithoutDetaching([$this->id => [
                'status' => $status
            ]]);

        //Refresh
        $this->append('interested_event_ids', 'going_event_ids');
        return $event->append('is_interested', 'is_going');
    }

    public function cancelParticipation(Event $event) : Event
    {
        $event->participants()->detach($this->id);
        $this->append('interested_event_ids', 'going_event_ids');
        return $event->append('is_interested', 'is_going');
    }
}