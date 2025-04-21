<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // Create 5 users
        $users = User::factory()->count(5)->create();

        // Create 10 comments
        $comments = Comment::factory()
            ->count(10)
            ->create([
                'user_id' => function () use ($users) {
                    return $users->random()->id;
                }
            ]);

        // Create random likes for comments
        foreach ($comments as $comment) {
            // Randomly select 0-3 users to like this comment
            $likingUsers = $users->random(rand(0, 3));

            foreach ($likingUsers as $user) {
                CommentLike::factory()->create([
                    'user_id' => $user->id,
                    'comment_id' => $comment->id,
                ]);
            }
        }
    }
}