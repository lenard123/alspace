<?php

namespace App\Models\Concerns;

use App\Models\Thread;

trait HasThreads
{
    public function threads()
    {
        return $this->belongsToMany(Thread::class);
    }

    public function supportThread() : Thread
    {
        if ($this->is_admin) return null;

        $thread =  $this->threads()->where('is_support', true)->first();

        if (is_null($thread)) {
            $thread = new Thread();
            $thread->is_support = true;
            $thread->save();
            $thread->members()->attach($this->id);
        }

        return $thread;
    }

    public function conversations()
    {
        return $this->threads()
            ->with('members')
            ->get()
            ->map(fn($thread) => $thread->loadInfo($this));
    }
}