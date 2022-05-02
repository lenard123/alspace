<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $this->validateInput($request);

        $user = $this->getUser($request);

        $this->checkPassword($user, $request->password);

        Auth::login($user);

        return $user;
    }

    private function throwError(string $message)
    {
        throw ValidationException::withMessages([
            'email' => $message,
        ]);
    }

    private function validateInput(Request $request)
    {
        $rules = [
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ];

        $message = ['email.exists' => 'We can\'t find a user with that email address.'];

        $this->validate($request, $rules, $message);
    }

    private function getUser(Request $request) : User
    {
        $user = User::where(['is_admin' => true, 'email' => $request->email]);

        if (! $user->exists() ) 
            $this->throwError('We can\'t find a user with that email address.');

        return $user->first();
    }

    private function checkPassword(User $user, string $password)
    {
        if (!Hash::check($password, $user->password)) {
            $this->throwError('Wrong email or password.');
        }
    }
}
