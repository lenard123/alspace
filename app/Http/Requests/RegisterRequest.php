<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\HumanName;
use App\Rules\Otp;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['bail', 'required', 'email', 'unique:users'],
            'otp' => ['bail', 'required', new Otp()],
            'student_id' => 'required',
            'firstname' => ['required', new HumanName()],
            'lastname' => ['required',  new HumanName()],
            'course' => ['required', 'regex:/bscs|bsit|bsemc|bsis/'],
            'year_graduated' => 'required|integer',
            'password' => 'required|min:8'
        ];
    }
}
