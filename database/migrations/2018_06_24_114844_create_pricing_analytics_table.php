<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePricingAnalyticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pricing_analytics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('active_constituent')->nullable()->default(null);
            $table->integer('brand_id')->unsigned()->nullable()->default(null);
            $table->integer('wholesale_price')->nullable()->default(null);
            $table->integer('retail_pharmacy_price')->nullable()->default(null);
            $table->integer('hospital_price')->nullable()->default(null);
            $table->integer('atc5_id')->unsigned()->nullable()->default(null);
            $table->integer('atc4_id')->unsigned()->nullable()->default(null);
            $table->integer('atc3_id')->unsigned()->nullable()->default(null);
            $table->integer('atc2_id')->unsigned()->nullable()->default(null);
            $table->timestamps();

            $table->foreign('brand_id')
                ->references('id')
                ->on('brands')
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
        Schema::dropIfExists('pricing_analytics');
    }
}
