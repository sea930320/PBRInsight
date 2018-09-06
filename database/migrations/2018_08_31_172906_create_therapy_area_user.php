<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTherapyAreaUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('therapy_area_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable()->default(null);
            $table->integer('therapy_area_id')->unsigned()->nullable()->default(null);
            $table->boolean('disease_prevalence_ana')->default(FALSE);
            $table->boolean('treatment_mapping')->default(FALSE);
            $table->boolean('patient_forecasting')->default(FALSE);
            $table->boolean('diagnotics')->default(FALSE);
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
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
        Schema::dropIfExists('therapy_area_user');
    }
}
