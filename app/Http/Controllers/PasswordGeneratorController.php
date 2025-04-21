<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordGeneratorController extends Controller
{
    private $symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+', '@', '^'];

    public function index()
    {
        return Inertia::render('password-generator', [
            'password' => session('password')
        ]);
    }

    public function generate(Request $request)
    {
        $request->validate([
            'length' => 'required|integer|min:4|max:50',
            'useLowercase' => 'required|boolean',
            'useUppercase' => 'required|boolean',
            'useNumbers' => 'required|boolean',
            'useSymbols' => 'required|boolean',
        ]);

        $length = $request->input('length');
        $useLowercase = $request->input('useLowercase');
        $useUppercase = $request->input('useUppercase');
        $useNumbers = $request->input('useNumbers');
        $useSymbols = $request->input('useSymbols');

        $password = $this->generatePassword($length, $useLowercase, $useUppercase, $useNumbers, $useSymbols);

        return Inertia::render('password-generator', [
            'password' => $password
        ]);
    }

    private function generatePassword($length, $useLowercase, $useUppercase, $useNumbers, $useSymbols)
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
