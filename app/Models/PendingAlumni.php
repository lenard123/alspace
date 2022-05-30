<?php

namespace App\Models;

use App\Events\AlumniRegistered;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class PendingAlumni extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'student_id',
        'firstname',
        'lastname',
        'course',
        'year_graduated',
        'email',
        'password'
    ];

    protected $appends = ['fullname'];

    protected static function booted() : void
    {
        static::created(function($alumni) {
            AlumniRegistered::dispatch($alumni);
        });
    }

    public function setPasswordAttribute($password) : void
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function getFullnameAttribute()
    {
        return $this->firstname." ".$this->lastname;
    }
}
