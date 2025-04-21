<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SnailSimulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'well_depth',
        'climb_per_day',
        'slip_per_night',
        'days_to_escape'
    ];
}