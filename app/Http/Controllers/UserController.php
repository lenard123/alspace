<?php

namespace App\Http\Controllers;

use App\Models\PendingAlumni;
use App\Models\User;
use App\Notifications\RegistrationApproved;
use App\Notifications\RejectedApplicationNotification;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function conversations()
    {
        return Auth::user()->conversations();
    }

    public function current()
    {
        return Auth::user()
            ->loadCount('unreadThread', 'unreadNotifications');
    }

    public function alumni(Request $request)
    {
        return User::alumni()
            ->when($request->has('query'), fn($q) => $q->search(request('query')))
            ->paginate(50);
    }

    public function works(User $user)
    {
        return $user->works;
    }

    public function updateAvatar(Request $request)
    {
        $image = Auth::user()->avatar;
        $image->upload($request->file('avatar'), 'avatar');
        return $image->url;
    }

    public function updateCover(Request $request)
    {
        $info = Auth::user()->info;
        $cover = $info->updateCover($request->file('cover'));
        return $cover->url;
    }

    public function updateInfo(Request $request)
    {
        $userinfo = Auth::user()->info;
        $userinfo->bio = $request->bio;
        $userinfo->birthday = $request->birthday;
        $userinfo->gender = $request->gender;
        $userinfo->save();
        return $userinfo;
    }

    public function search(Request $request)
    {
        return User::search($request->query('query'))->get()->where('id', '<>',  Auth::id())->values();
    }

    public function thread(User $user)
    {
        return Auth::user()->threadWith($user)->loadInfo(Auth::user());
    }

    public function view(User $user)
    {
        return $user->load('alumnus', 'info');
    }

    public function posts(User $user)
    {
        return $user->posts()->latest()->simplePaginate(10);
    }

    public function pending()
    {
        return PendingAlumni::paginate(10);
    }

    public function reject(PendingAlumni $alumni)
    {
        $alumni->notify(new RejectedApplicationNotification());
        return $alumni->delete();
    }

    public function approve(PendingAlumni $alumni)
    {
        DB::transaction(function() use ($alumni) {
            $user = User::create($alumni->only('firstname', 'lastname', 'email', 'password'));

            $user->alumnus()->create($alumni->only('year_graduated', 'course', 'student_id'));

            $alumni->delete();

            $user->notify(new RegistrationApproved());

        });
        
        return response()->noContent();
    }

    public function moderators()
    {
        return User::query()->moderators()->get();
    }

    public function addModerator(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:users|unique:pending_alumnis',
            'password' => 'required|confirmed|min:8'
        ]);

        $user = User::create($request->only('firstname', 'lastname', 'email', 'password'));
        $user->is_admin = true;
        $user->role = 'moderator';
        $user->save();

        return $user;
    }
}
