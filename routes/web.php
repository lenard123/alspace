<?php

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::view('/', 'home');
Route::view('/post', 'post');
Route::view('/events', 'events');
Route::view('/jobs', 'jobs');
Route::view('/job-details', 'job-details');
Route::view('/login', 'auth.login');
