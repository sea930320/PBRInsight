<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgeGroupReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('age_group_reports', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('age_group_id')->unsigned();
            $table->double('male', 5, 2);
            $table->double('female', 5, 2);
            $table->double('total', 5, 2);
            $table->timestamps();

            $table->foreign('age_group_id')
                ->references('id')
                ->on('age_groups')
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
        Schema::dropIfExists('age_group_reports');
    }
}
