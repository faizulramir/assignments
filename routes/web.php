<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PasswordGeneratorController;
use App\Http\Controllers\PizzaCalculatorController;
use App\Http\Controllers\CreditBalanceController;
use App\Http\Controllers\CommentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/password-generator', [PasswordGeneratorController::class, 'index']);
Route::post('/password-generator', [PasswordGeneratorController::class, 'generate']);

Route::get('/pizza-calculator', [PizzaCalculatorController::class, 'index'])->name('pizza-calculator');
Route::post('/pizza-calculator/calculate', [PizzaCalculatorController::class, 'calculate'])->name('pizza-calculator.calculate');
Route::post('/pizza-calculator/add-to-cart', [PizzaCalculatorController::class, 'addToCart'])->name('pizza-calculator.add-to-cart');
Route::post('/pizza-calculator/remove-from-cart', [PizzaCalculatorController::class, 'removeFromCart'])->name('pizza-calculator.remove-from-cart');
Route::post('/pizza-calculator/clear-cart', [PizzaCalculatorController::class, 'clearCart'])->name('pizza-calculator.clear-cart');

Route::get('/credit-balance', [CreditBalanceController::class, 'index'])->name('credit-balance');

Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');