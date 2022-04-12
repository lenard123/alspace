<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_at',
        'location',
        'description',
        'is_online',
    ];

    protected $casts = [
        'start_at' => 'datetime',
    ];

    protected $with = ['cover'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cover()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public static function active()
    {
        return self::where('start_at', '<=', 'today');
    }
}
