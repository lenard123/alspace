<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
    protected $appends = ['avatarUrl'];

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

    protected static function booted()
    {
        static::created(function ($user) {
            //Generate default Avatar
            $user->regenerateAvatar();
        });
    }

    public function alumnus()
    {
        return $this->hasOne(Alumnus::class);
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function avatar()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getAvatarUrlAttribute()
    {
        return $this->avatar->url;
    }

    public function regenerateAvatar()
    {
        //Delete if has avatar
        $this->avatar()->delete();

        //Generate new
        $name = strtolower(urlencode($this->firstname.' '.$this->lastname));
        $this->avatar()->create([
            'source' => 'url',
            'reference' => "https://avatars.dicebear.com/api/initials/$name.svg"
        ]);
    }
}
