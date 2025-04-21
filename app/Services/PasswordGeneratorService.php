<?php

namespace App\Services;

class PasswordGeneratorService
{
    private array $symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+', '@', '^'];

    public function generate(int $length, bool $useLowercase, bool $useUppercase, bool $useNumbers, bool $useSymbols): string
    {
        $characters = '';
        $password = '';

        if ($useLowercase) {
            $characters .= 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($useUppercase) {
            $characters .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ($useNumbers) {
            $characters .= '0123456789';
        }
        if ($useSymbols) {
            $characters .= implode('', $this->symbols);
        }

        // Ensure at least one character from each selected type
        if ($useLowercase) {
            $password .= chr(rand(97, 122));
        }
        if ($useUppercase) {
            $password .= chr(rand(65, 90));
        }
        if ($useNumbers) {
            $password .= rand(0, 9);
        }
        if ($useSymbols) {
            $password .= $this->symbols[array_rand($this->symbols)];
        }

        // Fill the rest of the password with random characters
        $remainingLength = $length - strlen($password);
        for ($i = 0; $i < $remainingLength; $i++) {
            $password .= $characters[rand(0, strlen($characters) - 1)];
        }

        // Shuffle the password to mix the characters
        return str_shuffle($password);
    }
}