<?php

namespace App\Services;

use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class CommentService
{
    public function getRawComments()
    {
        return Comment::select('id', 'content', 'user_id', 'created_at')
            ->latest()
            ->get();
    }

    public function getCommentsWithLikes()
    {
        $sqlQuery = "SELECT 
            c.id as comment_id,
            c.content,
            u.name as user_name,
            COUNT(cl.id) as likes_count,
            GROUP_CONCAT(DISTINCT ul.name) as liked_by_users
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN comment_likes cl ON c.id = cl.comment_id
        LEFT JOIN users ul ON cl.user_id = ul.id
        GROUP BY c.id, c.content, u.name
        ORDER BY c.created_at DESC";

        return [
            'sqlQuery' => $sqlQuery,
            'queryResults' => DB::select($sqlQuery)
        ];
    }
}