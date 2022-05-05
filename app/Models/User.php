<?php

namespace App\Models;

use App\Models\Concerns\CanComment;
use App\Models\Concerns\HasAvatar;
use App\Models\Concerns\CanLike;
use App\Models\Concerns\CanParticipateToEvents;
use App\Models\Concerns\CanPost;
use App\Models\Concerns\HasThreads;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use Searchable, 
        HasApiTokens, 
        HasFactory, 
        Notifiable, 
        HasAvatar, 
        CanLike, 
        CanComment, 
        HasThreads, 
        CanPost,
        CanParticipateToEvents;

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
        $currentUser = Auth::user();

        static::retrieved(function ($user) use ($currentUser) {
           if ($currentUser?->id === $user->id || $currentUser?->is_admin) {
               $user->makeVisible('email');
           }
        });

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
        $this->attributes['password'] = Hash::needsRehash($password) ? Hash::make($password) : $password;
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

    public function unreadThread()
    {
        return $this->threads()->whereHas('unreadMessages');
    }

    public function scopeAdmin($query)
    {
        return $query->where('is_admin', 1);
    }

    public function scopeAlumni($query)
    {
        return $query->whereHas('alumnus')->with('alumnus');
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

    public function readMessage(Message $message)
    {
        if ($message->user_id === $this->id) return;
        if ($message->has_read) return;

        //To prevent touching parent timestamp when reading
        $message->has_read = true;
        Message::where('id', $message->id)->update(['has_read' => true]);
    }

    public static function sendMessageSupport(User $user, string $content)
    {
        $thread = $user->supportThread();
        return User::admin()->first()->sendMessageOn($thread, $content);
    }
}
