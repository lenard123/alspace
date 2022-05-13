<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'content', 'has_read'];
    
    protected $hidden = ['user', 'thread'];

    protected $touches = ['thread'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function markAsRead()
    {
        if ($this->has_read) return;

        $this->updateQuietly([
            'has_read' => true,
        ]);
    }

    public function isSender($id = null)
    {
        $id = $id ?: Auth::id();
        return $id === $this->user_id;
    }
}
