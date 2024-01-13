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
        Schema::table('avertissemets', function (Blueprint $table) {
            $table->dropColumn(['joueur_nom', 'joueur_pre']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('avertissemets', function (Blueprint $table) {
            $table->string('joueur_nom', 25);
            $table->string('joueur_pre', 25);
        });
    }
};
