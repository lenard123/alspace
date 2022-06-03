<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\User;
use App\Observers\CommentObserver;
use App\Observers\UserObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [

        \App\Events\UserLoggedIn::class => [],

        \App\Events\UserParticipateToEvent::class => [],

        \App\Events\MessageSent::class => [
            \App\Listeners\DispatchMessageReceived::class,
        ],

        \App\Events\AlumniRegistered::class => [
        ],

        \App\Events\AlumniVerified::class => [
            \App\Listeners\SendWelcomeMessage::class
        ],

        \App\Events\CommentReceived::class => [
            \App\Listeners\SendCommentReceivedNotification::class,
        ],

        \App\Events\SupportMessageReceived::class => [
            \App\Listeners\ChatbotListener::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        User::observe(UserObserver::class);
        Comment::observe(CommentObserver::class);
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
