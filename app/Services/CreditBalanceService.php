<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CreditBalanceService
{
    public function getAllTransactions(): Collection
    {
        return User::query()
            ->select([
                'users.id as user_id',
                'users.name as user_name',
                'credits.balance',
                'credits.created_at'
            ])
            ->join('credits', 'users.id', '=', 'credits.user_id')
            ->orderBy('credits.created_at', 'desc')
            ->get();
    }

    public function getQueryResult(?string $date = null): Collection
    {
        $targetDate = $date ? Carbon::parse($date) : Carbon::parse('2022-12-31');

        return User::query()
            ->select([
                'users.id as user_id',
                'users.name as user_name',
                'credits.balance as last_balance',
                'credits.created_at as last_updated'
            ])
            ->join('credits', function ($join) use ($targetDate) {
                $join->on('users.id', '=', 'credits.user_id')
                    ->where('credits.created_at', '<=', $targetDate->endOfDay());
            })
            ->whereIn('credits.id', function ($query) use ($targetDate) {
                $query->selectRaw('MAX(id)')
                    ->from('credits')
                    ->where('created_at', '<=', $targetDate->endOfDay())
                    ->groupBy('user_id');
            })
            ->orderBy('users.id')
            ->get();
    }

    public function getRawQuery(?string $date = null): string
    {
        $targetDate = $date ? Carbon::parse($date) : Carbon::parse('2022-12-31');

        $query = User::query()
            ->select([
                'users.id as user_id',
                'users.name as user_name',
                'credits.balance as last_balance',
                'credits.created_at as last_updated'
            ])
            ->join('credits', function ($join) use ($targetDate) {
                $join->on('users.id', '=', 'credits.user_id')
                    ->where('credits.created_at', '<=', $targetDate->endOfDay());
            })
            ->whereIn('credits.id', function ($query) use ($targetDate) {
                $query->selectRaw('MAX(id)')
                    ->from('credits')
                    ->where('created_at', '<=', $targetDate->endOfDay())
                    ->groupBy('user_id');
            })
            ->orderBy('users.id');

        return $query->toSql();
    }
}