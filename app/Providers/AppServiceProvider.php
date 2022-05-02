<?php

namespace App\Providers;

use App\Services\SSRRoute;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        /**
         * This will use the app.url config as baseurl
         * when generating a url.
         */
        if (env('APP_FORCE_ROOT_URL', false)) {
            URL::forceRootUrl(config('app.url'));
            if (Str::contains(config('app.url'), 'https://')) {
                URL::forceScheme('https');
            }
        }

        $this->app->singleton(SSRRoute::class);

    }
}
