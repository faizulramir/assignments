<?php

namespace App\Http\Controllers;

use App\Http\Requests\PizzaCalculator\AddToCartRequest;
use App\Http\Requests\PizzaCalculator\RemoveFromCartRequest;
use App\Services\PizzaCalculatorService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PizzaCalculatorController extends Controller
{
    private PizzaCalculatorService $pizzaCalculatorService;

    public function __construct(PizzaCalculatorService $pizzaCalculatorService)
    {
        $this->pizzaCalculatorService = $pizzaCalculatorService;
    }

    public function index(Request $request): Response
    {
        $sessionId = $request->session()->getId();
        $cart = $this->pizzaCalculatorService->getCartBySession($sessionId);
        $cartTotal = $this->pizzaCalculatorService->getCartTotal($sessionId);

        return Inertia::render('pizza-calculator', [
            'cart' => $cart,
            'cartTotal' => $cartTotal,
        ]);
    }

    public function calculate(Request $request)
    {
        $request->validate([
            'size' => 'required|in:small,medium,large',
            'hasPepperoni' => 'required|boolean',
            'hasExtraCheese' => 'required|boolean',
        ]);

        $total = $this->pizzaCalculatorService->calculateTotal(
            $request->size,
            $request->hasPepperoni,
            $request->hasExtraCheese
        );

        return response()->json(['total' => $total]);
    }

    public function addToCart(AddToCartRequest $request)
    {
        $sessionId = $request->session()->getId();
        $validated = $request->validated();

        $this->pizzaCalculatorService->addToCart(
            $sessionId,
            $validated['size'],
            $validated['hasPepperoni'],
            $validated['hasExtraCheese']
        );

        $cart = $this->pizzaCalculatorService->getCartBySession($sessionId);
        $cartTotal = $this->pizzaCalculatorService->getCartTotal($sessionId);

        return back()->with([
            'cart' => $cart,
            'cartTotal' => $cartTotal,
        ]);
    }

    public function removeFromCart(RemoveFromCartRequest $request)
    {
        $sessionId = $request->session()->getId();
        $validated = $request->validated();

        $this->pizzaCalculatorService->removeFromCart($sessionId, $validated['id']);

        $cart = $this->pizzaCalculatorService->getCartBySession($sessionId);
        $cartTotal = $this->pizzaCalculatorService->getCartTotal($sessionId);

        return back()->with([
            'cart' => $cart,
            'cartTotal' => $cartTotal,
        ]);
    }

    public function clearCart(Request $request)
    {
        $sessionId = $request->session()->getId();
        $this->pizzaCalculatorService->clearCart($sessionId);

        return back()->with([
            'cart' => [],
            'cartTotal' => 0,
        ]);
    }
}
