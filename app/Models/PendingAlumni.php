<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class PendingAlumni extends Model
{
    use HasFactory;

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

    public function setPasswordAttribute($password) : void
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function getFullnameAttribute()
    {
        return $this->firstname." ".$this->lastname;
    }
}
