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
        Schema::create('changements', function (Blueprint $table) {
            $table->id();
            $table->string('joueur_nom_sort', 25);
            $table->string('joueur_pre_sort', 25);
            $table->integer('joueur_num_sort');
            $table->integer('joueur_licence_sort');

            $table->string('joueur_nom_entr', 25);
            $table->string('joueur_pre_entr', 25);
            $table->integer('joueur_num_entr');
            $table->integer('joueur_licence_entr');

            $table->unsignedBigInteger('club_id');
            $table->foreign('club_id')->references('id')->on('clubs');
            $table->string('cause');
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
        Schema::dropIfExists('changements');
    }
};
