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

    public function getAvatarAttribute()
    {
        if ($this->is_support) {
            return asset('images/logo.png');
        }

        return $this->getOtherMember()->avatarUrl;
    }

    public function getTitleAttribute()
    {
        if ($this->is_support) {
            return 'Alspace Support';
        }

        return $this->getOtherMember()->fullname;
    }

    private function getOtherMember()
    {
        if (is_null($this->otherMember)) {
            $this->otherMember = $this->members->where('id', '<>', $this->currentUser->id)->first();
        }
        return $this->otherMember;
    }

    public function loadInfo(User $user)
    {
        $this->currentUser = $user;
        $this->append('title', 'avatar');
        return $this;
    }

}
