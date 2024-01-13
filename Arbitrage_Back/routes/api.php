<?php

use App\Http\Controllers\AvertissementCotroller;
use App\Http\Controllers\ButsController;
use App\Http\Controllers\ChangementCotroller;
use App\Http\Controllers\ArbitreController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\delegueController;
use App\Http\Controllers\JoueurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\matcheController;
use App\Http\Controllers\SaisonController;
use App\Http\Controllers\StadeController;
use App\Http\Controllers\VilleController;
use App\Models\arbitre;
use App\Models\Joueur;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('matche', matcheController::class);

Route::get('/matche' , [matcheController::class, 'index']);
Route::post('/matche' , [matcheController::class, 'store']);
Route::put('/matche/{id}' , [matcheController::class, 'update']);
Route::delete('/matche/{id}' , [matcheController::class, 'destroy']);


// Route::apiResource('avertissemet', AvertissementCotroller::class);

Route::get('/avertissement' , [AvertissementCotroller::class, 'index']);
Route::post('/avertissement' , [AvertissementCotroller::class, 'store']);
Route::put('/avertissement/{id}' , [AvertissementCotroller::class, 'update']);
Route::delete('/ /{id}' , [AvertissementCotroller::class, 'destroy']);

// Route::apiResource('changement', ChangementCotroller::class);

Route::get('/changement' , [ChangementCotroller::class, 'index']);
Route::post('/changement' , [ChangementCotroller::class, 'store']);
Route::put('/changement/{id}' , [ChangementCotroller::class, 'update']);
Route::delete('/changement/{id}' , [ChangementCotroller::class, 'destroy']);

Route::get('/but' , [ButsController::class, 'index']);
Route::post('/but' , [ButsController::class, 'store']);
Route::put('/but/{id}' , [ButsController::class, 'update']);
Route::delete('/but/{id}' , [ButsController::class, 'destroy']);

//Arbitre
Route::get('/arbitre' , [ArbitreController::class, 'index']);
Route::post('/arbitre' , [ArbitreController::class, 'store']);
Route::put('/arbitre/{id}' , [ArbitreController::class, 'update']);
Route::delete('/arbitre/{id}' , [ArbitreController::class, 'destroy']);

//Delegue
Route::get('/delegue' , [delegueController::class, 'index']);
Route::post('/delegue' , [delegueController::class, 'store']);
Route::put('/delegue/{id}' , [delegueController::class, 'update']);
Route::delete('/delegue/{id}' , [delegueController::class, 'destroy']);

//Club
Route::get('/club' , [ClubController::class, 'index']);
Route::post('/club' , [ClubController::class, 'store']);
Route::delete('/club/{id}' , [ClubController::class, 'destroy']);
Route::put('/club/{id}' , [ClubController::class, 'update']);


//Stade
Route::get('/stade' , [StadeController::class, 'index']);
Route::post('/stade' , [StadeController::class, 'store']);
Route::put('/stade/{id}', [StadeController::class, 'update']);
Route::delete('/stade/{id}' , [StadeController::class, 'destroy']);

// villes
Route::get('/ville' , [VilleController::class, 'index']);
Route::post('/ville' , [VilleController::class, 'store']);
Route::put('/ville/{id}', [VilleController::class, 'update']);
Route::delete('/ville/{id}' , [VilleController::class, 'destroy']);

//competitions
Route::get('/competition' , [CompetitionController::class, 'index']);

//saison
Route::get('/saison' , [SaisonController::class, 'index']);

//category
Route::get('/category' , [CategoryController::class, 'index']);

//joueur
Route::get('/joueur' , [JoueurController::class, 'index']);
Route::post('/joueur' , [JoueurController::class, 'store']);
Route::put('/joueur/{id}', [JoueurController::class, 'update']);
Route::delete('/joueur/{id}' , [JoueurController::class, 'destroy']);
