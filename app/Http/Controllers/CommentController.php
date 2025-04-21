<?php

namespace App\Http\Controllers;

use App\Services\CommentService;
use Inertia\Inertia;

class CommentController extends Controller
{
    protected $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    public function index()
    {
        $rawComments = $this->commentService->getRawComments();
        $commentsWithLikes = $this->commentService->getCommentsWithLikes();

        return Inertia::render('comments', [
            'rawComments' => $rawComments,
            'sqlQuery' => $commentsWithLikes['sqlQuery'],
            'queryResults' => $commentsWithLikes['queryResults'],
        ]);
    }
}