<?php

namespace App\Services;

use App\Http\Controllers\SSRController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use function PHPUnit\Framework\isNull;

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
        $endPoint = $endPoint ?? $this->request->path();
        $request = Request::create("api/$endPoint", 'GET',$this->request->query());
        $response = Route::dispatch($request);
        return $response->getOriginalContent();
    }
}