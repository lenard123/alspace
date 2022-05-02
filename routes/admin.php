<?php

use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', LoginController::class);

Route::middleware(['auth:sanctum', 'admin'])->group(function(){

    Route::get('/users/pending', [UserController::class, 'pending']);

});