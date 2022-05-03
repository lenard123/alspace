<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PendingAlumni;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function pending()
    {
        return PendingAlumni::paginate(20);
    }

    public function approve(PendingAlumni $alumni)
    {
        $user = User::create($alumni->only('firstname', 'lastname', 'email', 'password'));

        $user->alumnus()->create($alumni->only('year_graduated', 'course', 'student_id'));

        $alumni->delete();
        
        return response()->json('', 204);
    }
}
