<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->group(function(){
    // Route::post('/users/pending/{alumni}', [UserController::class, 'approve']);
});