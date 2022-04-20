<?php

namespace App\Http\Middleware;

use App\Http\Controllers\SSRController;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class SSRMiddleware
{
    protected SSRController $ssr;

    public function __construct(SSRController $ssr)
    {
        $this->ssr = $ssr;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $api = null)
    {
        $response = $next($request);

        $this->injectResponse($response);

        if ($api !== null && Auth::check()) {
            if ($api === 'self')
                $this->injectRequest($request);
            else
                $this->injectApi($api);
        }

        return response($this->ssr->__invoke());
    }

    function injectApi($api)
    {
        $request = Request::create("api/$api");
        $response = Route::dispatch($request);
        $this->injectResponse($response);
    }

    function injectRequest(Request $request)
    {
        $apiRequest = Request::create("api/{$request->path()}", 'GET', $request->all());
        $response = Route::dispatch($apiRequest);
        $this->injectResponse($response);
    }

    function injectResponse($response)
    {
        if (! $response->isOk()) return;
        $this->ssr->inject($response->getOriginalContent());
    }
}
