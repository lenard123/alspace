<?php

namespace App\Models\Concerns;

use App\Models\Thread;

trait HasThreads
{
    public function threads()
    {
        return $this->belongsToMany(Thread::class);
    }

    public function conversations()
    {
        return $this->threads()
            ->with('members')
            ->get()
            ->map(fn($thread) => $thread->loadInfo($this));
    }
}