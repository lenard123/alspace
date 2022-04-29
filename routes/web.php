<?php

use App\Facades\SSRRoute;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SSRController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\SSRMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/mailable', function () {
    return new App\Mail\EmailVerification('lenard.mangayayam@gmail.com');
});

SSRRoute::api('/', 'posts');
SSRRoute::api('/posts/{post}');
// SSRRoute::controller('/messages', [UserController::class, 'conversations']);
SSRRoute::none('/reset-password/{token}')->name('password.reset');
SSRRoute::none('{path}')->where('path', '(.*)');