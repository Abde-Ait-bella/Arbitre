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
            $table->string('joueur_licence_entr', 25)->change()->after('joueur_num_entr');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('changements', function (Blueprint $table) {
            $table->integer('joueur_licence_entr', 25)->change()->after('joueur_num_entr');
        });
    }
};
