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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('saison_id');
            $table->foreign('saison_id')->references('id')->on('saison');
            $table->unsignedBigInteger('club_id_1');
            $table->unsignedBigInteger('club_id_2');
            $table->foreign('club_id_1')->references('id')->on('clubs');
            $table->foreign('club_id_2')->references('id')->on('clubs');
            $table->string('result_club_1');
            $table->string('result_club_2');
            $table->unsignedBigInteger('competition_id');
            $table->foreign('competition_id')->references('id')->on('competitions');
            $table->date('date');
            $table->string('temps');
            $table->unsignedBigInteger('ville_id');
            $table->foreign('ville_id')->references('id')->on('villes');
            $table->unsignedBigInteger('stade_id');
            $table->foreign('stade_id')->references('id')->on('stades');
            $table->unsignedBigInteger('categorie_id');
            $table->foreign('categorie_id')->references('id')->on('categories');
            $table->unsignedBigInteger('arbitre_c_id');
            $table->foreign('arbitre_c_id')->references('id')->on('arbitres');
            $table->unsignedBigInteger('arbitre_a1_id');
            $table->foreign('arbitre_a1_id')->references('id')->on('arbitres');
            $table->unsignedBigInteger('arbitre_a2_id');
            $table->foreign('arbitre_a2_id')->references('id')->on('arbitres');
            $table->unsignedBigInteger('delegue_id');
            $table->foreign('delegue_id')->references('id')->on('delegues');
            $table->time('temp_presence_delegue');
            $table->time('temp_presence_agents_sécurité');
            $table->integer('nombre_agents_sécurité');
            $table->string('etat_stade');
            $table->string('etat_vestiaire');
            $table->string('rapport_supp');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
