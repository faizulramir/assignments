<?php

namespace App\Http\Controllers;

use App\Services\SnailClimbingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SnailController extends Controller
{
    private $snailClimbingService;

    public function __construct(SnailClimbingService $snailClimbingService)
    {
        $this->snailClimbingService = $snailClimbingService;
    }

    public function index()
    {
        return Inertia::render('snail');
    }

    public function calculate(Request $request)
    {
        $wellDepth = $request->input('well_depth', 11);
        $climbPerDay = $request->input('climb_per_day', 3);
        $slipPerNight = $request->input('slip_per_night', 2);

        $progress = $this->snailClimbingService->calculateProgress(
            $wellDepth,
            $climbPerDay,
            $slipPerNight
        );

        return Inertia::render('snail', [
            'progress' => $progress,
            'well_depth' => $wellDepth,
            'climb_per_day' => $climbPerDay,
            'slip_per_night' => $slipPerNight
        ]);
    }
}