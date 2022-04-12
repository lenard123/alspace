<?php

namespace App\Models;

use App\Models\Concerns\CanComment;
use App\Models\Concerns\HasAvatar;
use App\Models\Concerns\CanLike;
use App\Models\Concerns\CanPost;
use App\Models\Concerns\HasThreads;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use Searchable, HasApiTokens, HasFactory, Notifiable, HasAvatar, CanLike, CanComment, HasThreads, CanPost;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
    ];

    protected $with = ['avatar'];
    protected $appends = ['avatarUrl', 'fullname'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'avatar',
        'email',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function booted() : void
    {
        static::created(function ($user) {
            //Generate default Avatar
            $user->regenerateAvatar();
        });
    }

    public function alumnus() : HasOne
    {
        return $this->hasOne(Alumnus::class);
    }

    public function setPasswordAttribute($password) : void
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function getFullnameAttribute() : string
    {
        return $this->firstname.' '.$this->lastname;
    }

    public function posts() : HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function likes() : HasMany
    {
        return $this->hasMany(Like::class);
    }

    public function sendMessageOn(Thread $thread, string $content)
    {
        $message = new Message();
        $message->content = $content;
        $message->user()->associate($this);
        $message->thread()->associate($thread);
        $message->save();
        return $message;
    }

    public static function admins()
    {
        return User::where('is_admin', true);
    }

    public function getScoutKey()
    {
        return $this->email;
    }

    public function getScoutKeyName()
    {
        return 'email';
    }

    public function toSearchableArray()
    {
        return [
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
        ];
    }

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
    
    public function getParticipatingEventIdsAttribute()
    {
        return $this->participatingEvents()->allRelatedIds();
    }

    public function participateEvent(Event $event, $status) : Event
    {
        if ($this->isParticipating($event)) return $event;

        $event->participants()->attach($this->id, ['status' => $status]);
        $this->append('participating_event_ids');
        return $event->refresh();
    }

    public function cancelParticipation(Event $event) : Event
    {
        $event->participants()->detach($this->id);
        $this->append('participating_event_ids');
        return $event->refresh();
    }

    public function isParticipating(Event $event)
    {
        return $this->participating_event_ids->contains($event->id);
    }

    public static function sendMessageSupport(User $user, string $content)
    {
        $thread = $user->supportThread();
        return User::admins()->first()->sendMessageOn($thread, $content);
    }
}
