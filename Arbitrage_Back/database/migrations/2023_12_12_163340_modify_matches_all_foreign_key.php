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
        Schema::table('matches', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['saison_id']);
            $table->dropForeign(['club_id_1']);
            $table->dropForeign(['club_id_2']);
            $table->dropForeign(['competition_id']);
            $table->dropForeign(['ville_id']);
            $table->dropForeign(['stade_id']);
            $table->dropForeign(['categorie_id']);
            $table->dropForeign(['arbitre_c_id']);
            $table->dropForeign(['arbitre_a1_id']);
            $table->dropForeign(['arbitre_a2_id']);
            $table->dropForeign(['delegue_id']);

            // Add a new foreign key constraint with ON DELETE CASCADE
            $table->foreign('saison_id')->references('id')->on('saisons')->onDelete('CASCADE');
            $table->foreign('club_id_1')->references('id')->on('clubs')->onDelete('CASCADE');
            $table->foreign('club_id_2')->references('id')->on('clubs')->onDelete('CASCADE');
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('CASCADE');
            $table->foreign('ville_id')->references('id')->on('villes')->onDelete('CASCADE');
            $table->foreign('stade_id')->references('id')->on('stades')->onDelete('CASCADE');
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('CASCADE');
            $table->foreign('arbitre_c_id')->references('id')->on('arbitres')->onDelete('CASCADE');
            $table->foreign('arbitre_a1_id')->references('id')->on('arbitres')->onDelete('CASCADE');
            $table->foreign('arbitre_a2_id')->references('id')->on('arbitres')->onDelete('CASCADE');
            $table->foreign('delegue_id')->references('id')->on('delegues')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('matches', function (Blueprint $table) {
            // Rollback changes if necessary
            $table->dropForeign(['saison_id']);
            $table->dropForeign(['club_id_1']);
            $table->dropForeign(['club_id_2']);
            $table->dropForeign(['competition_id']);
            $table->dropForeign(['ville_id']);
            $table->dropForeign(['stade_id']);
            $table->dropForeign(['categorie_id']);
            $table->dropForeign(['arbitre_c_id']);
            $table->dropForeign(['arbitre_a1_id']);
            $table->dropForeign(['arbitre_a2_id']);
            $table->dropForeign(['delegue_id']);

            $table->foreign('saison_id')->references('id')->on('saisons');
            $table->foreign('club_id_1')->references('id')->on('clubs');
            $table->foreign('club_id_2')->references('id')->on('clubs');
            $table->foreign('competition_id')->references('id')->on('competitions');
            $table->foreign('ville_id')->references('id')->on('villes');
            $table->foreign('stade_id')->references('id')->on('stades');
            $table->foreign('categorie_id')->references('id')->on('categories');
            $table->foreign('arbitre_c_id')->references('id')->on('arbitres');
            $table->foreign('arbitre_a1_id')->references('id')->on('arbitres');
            $table->foreign('arbitre_a2_id')->references('id')->on('arbitres');
            $table->foreign('delegue_id')->references('id')->on('delegues');
        });
    }
};
