<?php

namespace App\Http\Requests\PizzaCalculator;

use Illuminate\Foundation\Http\FormRequest;

class RemoveFromCartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:pizza_orders,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Please specify which item to remove.',
            'id.exists' => 'The selected item does not exist in your cart.',
        ];
    }
}