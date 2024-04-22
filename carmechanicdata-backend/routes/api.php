<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MainController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/logout-all-device',[AuthController::class,'logoutAllDevice']);

    Route::get('/user-data',[MainController::class,'getUserData']);

    Route::post('/search-cars',[MainController::class,'searchCars']);
    Route::get('/repairs/{car_id}',[MainController::class,'getRepairs']);
    Route::get('/parts/{car_id}/{repair_id}',[MainController::class,'getParts']);

    Route::put('/edit-car',[MainController::class,'editCar']);
    Route::put('/edit-repair',[MainController::class,'editRepair']);
    Route::put('/edit-part',[MainController::class,'editPart']);
    
});

