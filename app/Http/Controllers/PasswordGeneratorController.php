<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneratePasswordRequest;
use App\Services\PasswordGeneratorService;
use Inertia\Inertia;

class PasswordGeneratorController extends Controller
{
    public function __construct(
        private readonly PasswordGeneratorService $passwordGeneratorService
    ) {
    }

    public function index()
    {
        return Inertia::render('password-generator', [
            'password' => session('password')
        ]);
    }

    public function generate(GeneratePasswordRequest $request)
    {
        $password = $this->passwordGeneratorService->generate(
            length: $request->input('length'),
            useLowercase: $request->input('useLowercase'),
            useUppercase: $request->input('useUppercase'),
            useNumbers: $request->input('useNumbers'),
            useSymbols: $request->input('useSymbols'),
        );

        return Inertia::render('password-generator', [
            'password' => $password
        ]);
    }
}
