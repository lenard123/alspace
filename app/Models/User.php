<?php

namespace App\Models;

use App\Contracts\Likeable;
use App\Models\Concerns\CanComment;
use App\Models\Concerns\HasAvatar;
use App\Models\Concerns\CanLike;
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
    use Searchable, HasApiTokens, HasFactory, Notifiable, HasAvatar, CanLike, CanComment, HasThreads;

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
        'avatar'
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
            'id' => $this->id,
            'email' => $this->email,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname
        ];
    }

    public static function sendMessageSupport(User $user, string $content)
    {
        $thread = $user->supportThread();
        return User::admins()->first()->sendMessageOn($thread, $content);
    }
}
