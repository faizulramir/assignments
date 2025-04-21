<?php

namespace Database\Factories;

use App\Models\Credit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CreditFactory extends Factory
{
    protected $model = Credit::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'balance' => $this->faker->randomFloat(2, 0, 10000),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function withDate(string $date): self
    {
        return $this->state(function (array $attributes) use ($date) {
            return [
                'created_at' => $date,
                'updated_at' => $date,
            ];
        });
    }

    public function withBalance(float $balance): self
    {
        return $this->state(function (array $attributes) use ($balance) {
            return [
                'balance' => $balance,
            ];
        });
    }
}