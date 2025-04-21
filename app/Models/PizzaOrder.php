<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PizzaOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'size',
        'has_pepperoni',
        'has_extra_cheese',
        'item_total',
    ];

    protected $casts = [
        'has_pepperoni' => 'boolean',
        'has_extra_cheese' => 'boolean',
        'item_total' => 'decimal:2',
    ];
}
