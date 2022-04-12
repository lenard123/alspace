<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_at',
        'location',
        'description',
        'is_online',
    ];

    protected $casts = [
        'start_at' => 'datetime',
    ];

    protected $with = ['cover'];

    protected $appends = ['is_interested'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cover()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function interested()
    {
        return $this->participants()
            ->wherePivot('status', 'interested');
    }

    public function going()
    {
        return $this->participants()
            ->wherePivot('status', 'going');
    }

    public function getIsInterestedAttribute()
    {
        if (Auth::check()) {
            return Auth::user()->isParticipating($this);
        }
        return false;
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'events_participants', 'event_id', 'user_id');
    }


}
