<?php

namespace App\Services;

use App\Http\Controllers\SSRController;
use App\Http\Middleware\SSRMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class SSRRoute
{
    public function api($path, $api = 'self')
    {
        return Route::get($path)->middleware("ssr:$api");
    }

    public function none($path)
    {
        return Route::get($path)->middleware("ssr");
    }

    public function controller($path, $action)
    {
        return Route::get($path, $action)->middleware("ssr");
    }
}