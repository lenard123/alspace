<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    protected $fillable = ['is_support'];
    protected $hidden = ['members'];

    private $currentUser;
    private $otherMember;

    public function members()
    {
        return $this->belongsToMany(User::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function getAvatarAttribute()
    {
        if ($this->is_support) {
            return '/images/logo.png';
        }

        return $this->getOtherMemberAttribute()->avatarUrl;
    }

    public function getTitleAttribute()
    {
        if ($this->is_support) {
            return 'Alspace Support';
        }

        return $this->getOtherMemberAttribute()->fullname;
    }

    public function getOtherMemberAttribute()
    {
        if (is_null($this->otherMember)) {
            $this->otherMember = $this->members->where('id', '<>', $this->currentUser->id)->first();
        }
        return $this->otherMember;
    }

    public function loadInfo(User $user)
    {
        $this->currentUser = $user;
        $this->append('title', 'avatar', 'other_member');
        return $this;
    }

}
