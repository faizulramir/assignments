<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreditBalanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['nullable', 'date', 'before_or_equal:2022-12-31'],
        ];
    }

    public function messages(): array
    {
        return [
            'date.before_or_equal' => 'The date must be before or equal to December 31st, 2022.',
        ];
    }
}