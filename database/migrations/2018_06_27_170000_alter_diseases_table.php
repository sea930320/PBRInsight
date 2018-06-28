<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterDiseasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('diseases', function (Blueprint $table) {
            $table->integer('therapy_area_id')->unsigned()->nullable()->default(null);
            $table->foreign('therapy_area_id')
                ->references('id')
                ->on('therapy_areas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::table('diseases', function (Blueprint $table) {
            $table->dropForeign('diseases_therapy_area_id_foreign');
            $table->dropColumn('therapy_area_id');
        });
        Schema::enableForeignKeyConstraints();
    }
}
