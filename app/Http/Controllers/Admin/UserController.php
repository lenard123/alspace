<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PendingAlumni;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pending()
    {
        return PendingAlumni::paginate(20);
    }
}
