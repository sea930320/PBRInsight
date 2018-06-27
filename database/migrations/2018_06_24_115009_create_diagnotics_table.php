<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiagnoticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diagnotics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('period');
            $table->string('classification');
            $table->string('sub_analysis_1');
            $table->string('sub_analysis_2');
            $table->string('facility_type');
            $table->integer('clinic_type_id')->unsigned()->nullable()->default(null);
            $table->timestamps();

            $table->foreign('clinic_type_id')
                ->references('id')
                ->on('clinic_types')
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
        Schema::dropIfExists('diagnotics');
    }
}
