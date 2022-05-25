<?php

namespace App\Models;

use Carbon\Carbon;
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

    protected $with = ['cover', 'user'];

    protected $withCount = ['interested'];

    protected $appends = ['is_interested', 'is_going'];

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
        return Auth::check() && Auth::user()->interested_event_ids->contains($this->id);
    }

    public function getIsGoingAttribute()
    {
        return Auth::check() && Auth::user()->going_event_ids->contains($this->id);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'events_participants', 'event_id', 'user_id');
    }

    public function scopePending($query)
    {
        return $query->upcoming()->where('status', 'pending');
    }

    public function scopeActive($query)
    {
        return $query->upcoming()->where('status', 'approved');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_at', '>=', Carbon::today());
    }

    public function scopePast($query)
    {
        return $query->where('status', 'approved')->where('start_at', '<', Carbon::today());
    }

    public function scopeOwned($query)
    {
        return $query->where('user_id', Auth::id());
    }

    public function scopeInterested($query)
    {
        return $query->active()->whereHas('interested', function($query) {
            $query->where('user_id', Auth::id());
        });
    }

    public function scopeGoing($query)
    {
        return $query->active()->whereHas('going', function ($query) {
            $query->where('user_id', Auth::id());
        });
    }

    public function scopeCancelled($query)
    {
        return $query->where(function($query) {
            $query->where('status', 'pending');
            $query->where('start_at', '<', Carbon::today());
        })->orWhere('status', 'rejected');
    }
}
