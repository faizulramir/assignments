<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeneratePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'length' => ['required', 'integer', 'min:4', 'max:50'],
            'useLowercase' => ['required', 'boolean'],
            'useUppercase' => ['required', 'boolean'],
            'useNumbers' => ['required', 'boolean'],
            'useSymbols' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'length.required' => 'Password length is required',
            'length.integer' => 'Password length must be a number',
            'length.min' => 'Password must be at least 4 characters long',
            'length.max' => 'Password cannot be longer than 50 characters',
            'useLowercase.required' => 'Lowercase option is required',
            'useLowercase.boolean' => 'Lowercase option must be true or false',
            'useUppercase.required' => 'Uppercase option is required',
            'useUppercase.boolean' => 'Uppercase option must be true or false',
            'useNumbers.required' => 'Numbers option is required',
            'useNumbers.boolean' => 'Numbers option must be true or false',
            'useSymbols.required' => 'Symbols option is required',
            'useSymbols.boolean' => 'Symbols option must be true or false',
        ];
    }
}