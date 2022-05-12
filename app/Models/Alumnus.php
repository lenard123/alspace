<?php

namespace App\Models;

use App\Events\AlumniVerified;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Alumnus extends Model
{
    use HasFactory;

    protected $fillable = ['year_graduated', 'course', 'student_id'];

    protected $primaryKey = 'user_id';

    public $incrementing = false;

    public static function booted() : void
    {
        static::created(function($alumnus) {
            AlumniVerified::dispatch($alumnus->user_id);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function works()
    {
        return $this->hasMany(Work::class, 'user_id')
            ->orderBy('start_at', 'ASC');
    }
}
