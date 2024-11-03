<?php

use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TiposController;


// Rotas de autenticação
Route::post('register',[UserAuthController::class,'register']);
Route::post('login', [AuthController::class, 'login']);

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user(); // Retorna o usuário autenticado
    });


    Route::post('createTipos', [TiposController::class, 'store']);
    Route::get('tipos', [TiposController::class, 'all']);






});
