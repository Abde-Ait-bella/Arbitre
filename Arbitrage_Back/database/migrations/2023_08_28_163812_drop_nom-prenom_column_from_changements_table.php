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
        Schema::table('changements', function (Blueprint $table) {
            $table->dropColumn('joueur_pre_sort');
            $table->dropColumn('joueur_pre_entr');
            $table->string('joueur_nom_sort' ,50)->change();
            $table->string('joueur_nom_entr' ,50)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('changements', function (Blueprint $table) {
            $table->string('joueur_pre_sort', 25);
            $table->string('joueur_pre_entr', 25);
        });
    }
};
