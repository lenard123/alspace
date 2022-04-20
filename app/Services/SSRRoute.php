<?php

namespace App\Services;

use App\Http\Controllers\SSRController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class SSRRoute
{
    private Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function api($path, $endPoint = null)
    {
        $callback = $this->getCallback($endPoint);
        return Route::get($path, $callback);
    }

    function getCallback($endPoint)
    {
        return function(SSRController $controller) use ($endPoint) {
            $controller->inject($this->call($endPoint));
            return $controller();
        };
    }

    function call($endPoint)
    {

        if (! Auth::check() ) return null;

        $endPoint = $endPoint ?? $this->request->path();
        $apiRequest = Request::create("api/$endPoint");
        $newRequest = Request::createFrom($apiRequest, $this->request);

        return Route::getRoutes()->match($newRequest)->run();
    }
}