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
        Schema::table('arbitres', function (Blueprint $table) {
            $table->dropForeign(['ville_id']); // Drop the existing foreign key constraint

            // Add a new foreign key constraint with ON DELETE CASCADE
            $table->foreign('ville_id')->references('id')->on('villes')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('arbitres', function (Blueprint $table) {
            // Rollback changes if necessary
            $table->dropForeign(['ville_id']);
            $table->foreign('ville_id')->references('id')->on('villes');
        });
    }
};
