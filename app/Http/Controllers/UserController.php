<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function conversations()
    {
        return Auth::user()->conversations();
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
        return $user;
    }

    public function posts(User $user)
    {
        return $user->posts()->paginate(10);
    }
}
