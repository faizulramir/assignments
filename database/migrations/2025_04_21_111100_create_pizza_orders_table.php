<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pizza_orders', function (Blueprint $table) {
            $table->id();
            $table->string('session_id');
            $table->string('size');
            $table->boolean('has_pepperoni');
            $table->boolean('has_extra_cheese');
            $table->decimal('item_total', 8, 2);
            $table->timestamps();

            $table->index('session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pizza_orders');
    }
};
