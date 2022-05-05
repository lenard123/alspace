<?php

use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ThreadController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->group(function(){

    Route::get('/users/pending', [UserController::class, 'pending']);
    Route::post('/users/pending/{alumni}', [UserController::class, 'approve']);

});