<?php

namespace App\Facades;

use App\Services\SSRRoute as ServicesSSRRoute;
use Illuminate\Support\Facades\Facade;

class SSRRoute extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ServicesSSRRoute::class;
    }
}