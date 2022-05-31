<?php

use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterValidatorController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\TShirtController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkController;
use App\Models\TShirtRequest;
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

    Route::controller(UserController::class)->group(function() {
        Route::get('/user', 'current');
        Route::get('/user/conversations', 'conversations');
        Route::patch('/user/avatar', 'updateAvatar');
        Route::patch('/user/info/cover', 'updateCover');
    
        Route::get('/users/search','search');
        Route::get('/users/alumni', 'alumni');
        Route::get('/users/pending', 'pending')->middleware('admin');
        Route::post('/users/pending/{alumni}', 'approve')->middleware('admin');
        Route::delete('/users/pending/{alumni}', 'reject')->middleware('admin');
        Route::get('/users/{user}/thread', 'thread');
        Route::get('/users/{user}', 'view');
        Route::get('/users/{user}/posts', 'posts');
        Route::get('/users/{user}/works', 'works');
    });

    Route::get('/items/tshirts', [TShirtController::class, 'index'])->middleware('admin');
    Route::post('/items/tshirts/{tshirt}/request', [TShirtController::class, 'createRequest']);
    Route::get('/items/tshirts/available', [TShirtController::class, 'available']);
    Route::post('/items/tshirts', [TShirtController::class, 'create']);
    Route::get('/items/requests', [TShirtController::class, 'requests']);

    Route::get('/jobs', [JobController::class, 'index']);
    Route::post('/jobs', [JobController::class, 'create']);

    Route::post('/works', [WorkController::class, 'create']);

    Route::get('/threads/support', [ThreadController::class, 'supportThreads'])->middleware('admin');
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
    Route::patch('/events/{event}/approve', [EventController::class, 'approve'])->middleware('admin');

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::delete('/notifications', [NotificationController::class, 'clear']);
    Route::patch('/notifications', [NotificationController::class, 'markAllAsRead']);
    Route::patch('/notifications/{notification}', [NotificationController::class, 'markAsRead']);

    Route::post('/logout', [AuthController::class, 'logout']);
    
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/register-validator', [RegisterValidatorController::class, 'registerValidator']);
Route::post('/register-validator/send-otp', [RegisterValidatorController::class, 'sendOTP']);
Route::post('/login', LoginController::class);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/admin-login', AdminLoginController::class);
