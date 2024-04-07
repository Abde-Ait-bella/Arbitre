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
            $table->unsignedBigInteger('centre_ville')->after('arbitre_c_id');
            $table->foreign('centre_ville')->references('id')->on('villes');

            $table->unsignedBigInteger('assistant_1_ville')->after('arbitre_a1_id');
            $table->foreign('assistant_1_ville')->references('id')->on('villes');

            $table->unsignedBigInteger('assistant_2_ville')->after('arbitre_a2_id');
            $table->foreign('assistant_2_ville')->references('id')->on('villes');

            $table->unsignedBigInteger('delegue_ville')->after('delegue_id');
            $table->foreign('delegue_ville')->references('id')->on('villes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->dropForeign(['centre_ville']);
            $table->dropColumn('centre_ville');

            $table->dropForeign(['assistant_1_ville']);
            $table->dropColumn('assistant_1_ville');

            $table->dropForeign(['assistant_2_ville']);
            $table->dropColumn('assistant_2_ville');

            $table->dropForeign(['delegue_ville']);
            $table->dropColumn('delegue_ville');
        });
    }
};
