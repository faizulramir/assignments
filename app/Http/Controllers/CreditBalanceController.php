<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreditBalanceRequest;
use App\Services\CreditBalanceService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CreditBalanceController extends Controller
{
    public function __construct(
        private readonly CreditBalanceService $creditBalanceService
    ) {
    }

    public function index(CreditBalanceRequest $request)
    {
        $transactions = $this->creditBalanceService->getAllTransactions();
        $queryResult = $this->creditBalanceService->getQueryResult($request->input('date'));
        $rawQuery = $this->creditBalanceService->getRawQuery($request->input('date'));

        return Inertia::render('credit-balance', [
            'transactions' => $transactions,
            'queryResult' => $queryResult,
            'rawQuery' => $rawQuery,
        ]);
    }
}