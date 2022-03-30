<?php

namespace App\Models;

use App\Contracts\Likable;
use App\Contracts\Likeable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
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

    public function avatar(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function getAvatarUrlAttribute() : string
    {
        return $this->avatar->url;
    }

    public function getFullnameAttribute() : string
    {
        return $this->firstname.' '.$this->lastname;
    }

    public function regenerateAvatar() : void
    {
        //Delete if has avatar
        $this->avatar()->delete();

        //Generate new
        $name = strtolower(urlencode($this->fullname));
        $this->avatar()->create([
            'source' => 'url',
            'reference' => "https://avatars.dicebear.com/api/initials/$name.svg"
        ]);
    }

    public function posts() : HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function like(Likeable $likeable): self
    {
        if ($this->hasLiked($likeable)) {
            return $this;
        }

        (new Like())
            ->user()->associate($this)
            ->likeable()->associate($likeable)
            ->save();

        return $this;
    }

    public function unlike(Likeable $likeable): self
    {
        if (! $this->hasLiked($likeable)) {
            return $this;
        }

        $likeable->likes()
            ->whereHas('user', fn($q) => $q->whereId($this->id))
            ->delete();

        return $this;
    }

    public function hasLiked(Likeable $likeable): bool
    {
        if (! $likeable->exists) {
            return false;
        }

        return $likeable->likes()
            ->whereHas('user', fn($q) =>  $q->whereId($this->id))
            ->exists();
    }
}
