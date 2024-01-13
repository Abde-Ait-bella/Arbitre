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
            $table->string('joueur_num_sort')->change();
            $table->string('joueur_num_entr')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('changements', function (Blueprint $table) {
            $table->integer('joueur_num_sort')->change();
            $table->integer('joueur_num_entr')->change();
        });
    }
};
