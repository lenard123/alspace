<?php

namespace App\Http\Controllers;

use App\Mail\EmailVerification;
use App\Rules\HumanName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class RegisterValidatorController extends Controller
{

    private function validatePersonalInfo(Request $request)
    {
        $rules = $this->getRules()->only('student_id', 'firstname', 'lastname', 'year_graduated', 'course')->toArray();

        $request->validate($rules);

        return array_keys($rules);
    }

    private function getRules()
    {
        return collect([
            'student_id' => 'required',
            'firstname' => ['required', new HumanName()],
            'lastname' => ['required', new HumanName()],
            'course' => ['required', 'regex:/bscs|bsit|bsemc|bsis/'],
            'year_graduated' => 'required|integer',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);
    }

    private function validateAccountInfo(Request $request)
    {
        $rules = $this->getRules()->only('email', 'password')->toArray();

        $request->validate($rules);

        return array_keys($rules);
    }

    public function sendOTP(Request $request)
    {
        $request->validate($this->getRules()->only('email')->toArray());
        
        $email = $request->email;

        Mail::to($email)->send(new EmailVerification($email));

        return response('', 205);
    }

    public function registerValidator(Request $request)
    {
        $step = $request->get('step') ?? '0';

        switch ($step) {
            case '0': {
                $input = $this->validatePersonalInfo($request);
                return $request->only($input);
            }
            case '1': {
                $input = $this->validateAccountInfo($request);
                return $request->only($input);
            }
        }

        abort(404);
    }
}
