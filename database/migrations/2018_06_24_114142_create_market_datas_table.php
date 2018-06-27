<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMarketDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('market_datas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('brand_id')->unsigned()->nullable()->default(null);
            $table->integer('year')->nullable()->default(null);
            $table->integer('company_id')->unsigned()->nullable()->default(null);
            $table->integer('generic_name_id')->unsigned()->nullable()->default(null);
            $table->integer('atc5_id')->unsigned()->nullable()->default(null);
            $table->integer('atc2_id')->unsigned()->nullable()->default(null);
            $table->integer('atc1_id')->unsigned()->nullable()->default(null);
            $table->integer('drug_form_id')->unsigned()->nullable()->default(null);
            $table->string('country');
            $table->string('volumn');
            $table->integer('value')->nullable()->default(null);
            $table->timestamps();

            $table->foreign('brand_id')
                ->references('id')
                ->on('brands')
                ->onDelete('cascade');
            $table->foreign('company_id')
                ->references('id')
                ->on('companies')
                ->onDelete('cascade');
            $table->foreign('generic_name_id')
                ->references('id')
                ->on('generic_names')
                ->onDelete('cascade');
            $table->foreign('atc5_id')
                ->references('id')
                ->on('atc5s')
                ->onDelete('cascade');
            $table->foreign('atc2_id')
                ->references('id')
                ->on('atc2s')
                ->onDelete('cascade');
            $table->foreign('atc1_id')
                ->references('id')
                ->on('atc1s')
                ->onDelete('cascade');
            $table->foreign('drug_form_id')
                ->references('id')
                ->on('drug_forms')
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
        Schema::dropIfExists('market_datas');
    }
}
