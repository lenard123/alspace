<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\PendingAlumni;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        $user = $this->findUser($request);

        if (!$user->exists()) {
            $this->checkPending($request);
            $this->throwError('We can\'t find a user with that email or student id');
        }

        $user = $user->first();

        //Compare Password
        if (!Hash::check($request->password, $user->password)) {
            $this->throwError('Wrong Email or Password');
        }

        Auth::login($user, $request->input('remember', false));

        return $user->loadCount('unreadThread', 'unreadNotifications');
    }

    private function throwError(string $message)
    {
        throw ValidationException::withMessages([
            'user_id' => $message,
        ]);
    }

    private function findUser(LoginRequest $request)
    {
        $user_id = $request->user_id;

        return User::query()
            ->whereRelation('alumnus', fn($q) => $q->where('student_id', $user_id))
            ->orWhere('email', $user_id);
    }

    private function checkPending(LoginRequest $request)
    {
        $user_id = $request->user_id;
        
        $user = PendingAlumni::query()
            ->where('email', $user_id)
            ->orWhere('student_id', $user_id);
        
        if ($user->exists()) {
            $this->throwError('Your account is still pending. We will send you a mail once the admin verified your registration.');
        }
    }
}
