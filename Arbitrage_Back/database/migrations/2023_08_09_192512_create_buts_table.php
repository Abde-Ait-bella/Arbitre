<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buts', function (Blueprint $table) {
            $table->id();
            $table->string('joueur_nom', 25);
            $table->string('joueur_pre', 25);
            $table->string('joueur_numero_licence', 25);
            $table->integer('joueur_numero');
            $table->string('minute', 25);
            $table->unsignedBigInteger('matche_id');
            $table->foreign('matche_id')->references('id')->on('matches');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buts');
    }
};
