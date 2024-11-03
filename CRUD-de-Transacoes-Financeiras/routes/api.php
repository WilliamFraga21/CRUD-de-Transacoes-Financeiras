<?php

use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TiposController;
use App\Http\Controllers\TransacoesController;
use App\Http\Controllers\CategoriaController;


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


    Route::post('createCategoria', [CategoriaController::class, 'store']);


    Route::post('createTransacoes', [TransacoesController::class, 'store']);
    Route::post('updateTransacoes/{id}', [TransacoesController::class, 'update']);
    Route::get('Transacoes', [TransacoesController::class, 'all']);
    Route::delete('deleteTransacoes/{id}', [TransacoesController::class, 'delete']);
    Route::get('Transacoes/{id}', [TransacoesController::class, 'filtrer']);





});
