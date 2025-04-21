<?php

namespace Database\Seeders;

use App\Models\Credit;
use App\Models\User;
use Illuminate\Database\Seeder;

class CreditSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 users with multiple credit entries
        User::factory(5)->create()->each(function ($user) {
            // Create multiple credit entries for each user
            Credit::factory(3)->create([
                'user_id' => $user->id,
            ]);

            // Create a specific credit entry for December 31st, 2022
            Credit::factory()->create([
                'user_id' => $user->id,
                'created_at' => '2022-12-31 23:59:59',
                'updated_at' => '2022-12-31 23:59:59',
            ]);
        });
    }
}