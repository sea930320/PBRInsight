<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiseasePrevalencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disease_prevalences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('patient');
            $table->string('period');
            $table->string('active_constituent')->nullable()->default(null);
            $table->integer('brand_id')->unsigned()->nullable()->default(null);
            $table->integer('clinic_type_id')->unsigned()->nullable()->default(null);
            $table->integer('therapy_area_id')->unsigned()->nullable()->default(null);
            $table->integer('disease_id')->unsigned()->nullable()->default(null);
            $table->integer('atc5_id')->unsigned()->nullable()->default(null);
            $table->integer('atc4_id')->unsigned()->nullable()->default(null);
            $table->integer('atc3_id')->unsigned()->nullable()->default(null);
            $table->integer('atc2_id')->unsigned()->nullable()->default(null);
            $table->timestamps();

            $table->foreign('brand_id')
                ->references('id')
                ->on('brands')
                ->onDelete('cascade');
            $table->foreign('clinic_type_id')
                ->references('id')
                ->on('clinic_types')
                ->onDelete('cascade');
            $table->foreign('therapy_area_id')
                ->references('id')
                ->on('therapy_areas')
                ->onDelete('cascade');
            $table->foreign('disease_id')
                ->references('id')
                ->on('diseases')
                ->onDelete('cascade');
            $table->foreign('atc5_id')
                ->references('id')
                ->on('atc5s')
                ->onDelete('cascade');
            $table->foreign('atc4_id')
                ->references('id')
                ->on('atc4s')
                ->onDelete('cascade');
            $table->foreign('atc3_id')
                ->references('id')
                ->on('atc3s')
                ->onDelete('cascade');
            $table->foreign('atc2_id')
                ->references('id')
                ->on('atc2s')
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
        Schema::dropIfExists('disease_prevalences');
    }
}
