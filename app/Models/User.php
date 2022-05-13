<?php

namespace App\Models;

use App\Models\Concerns\CanComment;
use App\Models\Concerns\HasAvatar;
use App\Models\Concerns\CanLike;
use App\Models\Concerns\CanParticipateToEvents;
use App\Models\Concerns\CanPost;
use App\Models\Concerns\CanSendMessage;
use App\Models\Concerns\HasThreads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
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
        CanSendMessage,
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
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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

    public function scopeAdmin($query)
    {
        return $query->where('is_admin', 1);
    }

    public function scopeAlumni($query)
    {
        return $query->whereHas('alumnus')->with('alumnus');
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

}
