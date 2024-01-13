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
            $table->dropForeign(['club_id']); // Drop the existing foreign key constraint
            $table->dropForeign(['matche_id']);

            // Add a new foreign key constraint with ON DELETE CASCADE
            $table->foreign('club_id')->references('id')->on('clubs')->onDelete('CASCADE');
            $table->foreign('matche_id')->references('id')->on('matches')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('changements', function (Blueprint $table) {
            // Rollback changes if necessary
            $table->dropForeign(['club_id']);
            $table->dropForeign(['matche_id']);
            
            $table->foreign('club_id')->references('id')->on('clubs');
            $table->foreign('matche_id')->references('id')->on('matches');
        });
    }
};
