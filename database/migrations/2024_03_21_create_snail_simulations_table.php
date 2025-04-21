<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('snail_simulations', function (Blueprint $table) {
            $table->id();
            $table->integer('well_depth');
            $table->integer('climb_per_day');
            $table->integer('slip_per_night');
            $table->integer('days_to_escape');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('snail_simulations');
    }
};