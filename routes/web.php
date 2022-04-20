<?php

use App\Facades\SSRRoute;
use App\Http\Controllers\SSRController;
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


// Route::view('{path}', 'main')->where('path', '(.*)');
SSRRoute::api('/', 'posts');
SSRRoute::api('/posts/{id}');
Route::get('{path}', SSRController::class)->where('path', '^api');