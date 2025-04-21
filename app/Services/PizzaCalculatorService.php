<?php

namespace App\Services;

use App\Models\PizzaOrder;

class PizzaCalculatorService
{
    private const PRICES = [
        'small' => 15,
        'medium' => 22,
        'large' => 30,
        'pepperoni_small' => 3,
        'pepperoni_medium' => 5,
        'extra_cheese' => 6,
    ];

    public function calculateTotal(string $size, bool $hasPepperoni, bool $hasExtraCheese): float
    {
        $total = self::PRICES[$size];

        if ($hasPepperoni) {
            $total += $size === 'small' ? self::PRICES['pepperoni_small'] : self::PRICES['pepperoni_medium'];
        }

        if ($hasExtraCheese) {
            $total += self::PRICES['extra_cheese'];
        }

        return $total;
    }

    public function getCartBySession(string $sessionId): array
    {
        return PizzaOrder::where('session_id', $sessionId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'size' => $order->size,
                    'hasPepperoni' => $order->has_pepperoni,
                    'hasExtraCheese' => $order->has_extra_cheese,
                    'itemTotal' => (float) $order->item_total,
                ];
            })
            ->toArray();
    }

    public function getCartTotal(string $sessionId): float
    {
        return PizzaOrder::where('session_id', $sessionId)->sum('item_total');
    }

    public function addToCart(string $sessionId, string $size, bool $hasPepperoni, bool $hasExtraCheese): void
    {
        $itemTotal = $this->calculateTotal($size, $hasPepperoni, $hasExtraCheese);

        PizzaOrder::create([
            'session_id' => $sessionId,
            'size' => $size,
            'has_pepperoni' => $hasPepperoni,
            'has_extra_cheese' => $hasExtraCheese,
            'item_total' => $itemTotal,
        ]);
    }

    public function removeFromCart(string $sessionId, int $orderId): void
    {
        PizzaOrder::where('session_id', $sessionId)
            ->where('id', $orderId)
            ->delete();
    }

    public function clearCart(string $sessionId): void
    {
        PizzaOrder::where('session_id', $sessionId)->delete();
    }
}