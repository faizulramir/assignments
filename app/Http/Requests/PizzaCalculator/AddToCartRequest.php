<?php

namespace App\Http\Requests\PizzaCalculator;

use Illuminate\Foundation\Http\FormRequest;

class AddToCartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'size' => ['required', 'string', 'in:small,medium,large'],
            'hasPepperoni' => ['required', 'boolean'],
            'hasExtraCheese' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'size.required' => 'Please select a pizza size.',
            'size.in' => 'Please select a valid pizza size.',
            'hasPepperoni.required' => 'Please specify if you want pepperoni.',
            'hasExtraCheese.required' => 'Please specify if you want extra cheese.',
        ];
    }
}