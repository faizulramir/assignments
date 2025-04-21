<?php

namespace App\Services;

class SnailClimbingService
{
    public function calculateProgress(int $wellDepth, int $climbPerDay, int $slipPerNight): array
    {
        $position = 0;
        $day = 0;
        $progress = [];

        while ($position < $wellDepth) {
            $day++;

            // Day climb
            $position += $climbPerDay;
            $progress[] = [
                'day' => $day,
                'position' => $position,
                'is_day' => true
            ];

            if ($position >= $wellDepth) {
                break;
            }

            // Night slip
            $position = max(0, $position - $slipPerNight);
            $progress[] = [
                'day' => $day,
                'position' => $position,
                'is_day' => false
            ];
        }

        return $progress;
    }
}