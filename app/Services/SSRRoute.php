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
        return $this->getRoute($path, null, "ssr:$api");
    }

    public function none($path)
    {
        return $this->getRoute($path);
    }

    public function controller($path, $action)
    {
        return $this->getRoute($path, $action);
    }

    public function getRoute($path, $action = null, $middleware = 'ssr')
    {
        if ($action === null)
            $action = fn() => null;
        return Route::get($path, $action)->middleware($middleware);
    }
}