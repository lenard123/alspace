<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SSRController extends Controller
{

    private $payload = null;

    public function __invoke()
    {
        $user = Auth::user();
        $payload = $this->payload;
        return view('main', compact('user', 'payload'));
    }

    public function inject($payload) {
        $this->payload = $payload;
    }
}
