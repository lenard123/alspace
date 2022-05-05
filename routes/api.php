<?php

use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterValidatorController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Broadcast::routes(['middleware' => 'auth:sanctum']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [UserController::class, 'current']);
    Route::get('/user/conversations', [UserController::class, 'conversations']);

    Route::get('/users/search', [UserController::class, 'search']);
    Route::get('/users/{user}/thread', [UserController::class, 'thread']);
    Route::get('/users/{user}', [UserController::class, 'view']);
    Route::get('/users/{user}/posts', [UserController::class, 'posts']);

    Route::get('/threads/{thread}', [ThreadController::class, 'view']);
    Route::get('/threads/{thread}/messages', [ThreadController::class, 'messages']);
    Route::post('/threads/{thread}', [ThreadController::class, 'sendMessage']);

    Route::put('/messages/{message}', [MessageController::class, 'readMessage']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}', [PostController::class, 'view']);
    Route::post('/posts', [PostController::class, 'create']);
    Route::post('/posts/{post}/like', [PostController::class, 'like']);
    Route::post('/posts/{post}/unlike', [PostController::class, 'unlike']);
    Route::post('/posts/{post}/comment', [PostController::class, 'comment']);
    Route::get('/posts/{post}/comments', [PostController::class, 'comments']);
    Route::delete('/posts/{post}', [PostController::class, 'delete']);

    Route::post('/comments/{comment}/like', [CommentController::class, 'like']);
    Route::post('/comments/{comment}/unlike', [CommentController::class, 'unlike']);
    Route::get('/comments/{comment}/replies', [CommentController::class, 'replies']);
    Route::post('/comments/{comment}/replies', [CommentController::class, 'reply']);

    Route::get('/events', [EventController::class, 'index']);
    Route::post('/events', [EventController::class, 'create']);
    Route::get('/events/{event}', [EventController::class, 'view']);
    Route::get('/events/{event}/participants', [EventController::class, 'participants']);
    Route::post('/events/{event}/participants', [EventController::class, 'interested']);
    Route::put('/events/{event}/participants', [EventController::class, 'going']);
    Route::delete('/events/{event}/participants', [EventController::class, 'notInterested']);

    Route::post('/logout', [AuthController::class, 'logout']);
    
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/register-validator', [RegisterValidatorController::class, 'registerValidator']);
Route::post('/register-validator/send-otp', [RegisterValidatorController::class, 'sendOTP']);
Route::post('/login', LoginController::class);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/admin-login', AdminLoginController::class);
