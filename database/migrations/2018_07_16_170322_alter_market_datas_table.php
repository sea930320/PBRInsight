<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterMarketDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('market_datas', function (Blueprint $table) {
            $table->integer('atc4_id')->unsigned()->nullable()->default(null);
            $table->integer('atc3_id')->unsigned()->nullable()->default(null);
            $table->integer('value_pounds')->nullable()->default(null);
            $table->integer('value_dollars')->nullable()->default(null);
            $table->integer('value_euros')->nullable()->default(null);

            $table->foreign('atc4_id')
                ->references('id')
                ->on('atc4s')
                ->onDelete('cascade');
            $table->foreign('atc3_id')
                ->references('id')
                ->on('atc3s')
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
        Schema::table('market_datas', function (Blueprint $table) {
            $table->dropForeign('market_datas_atc4_id_foreign');
            $table->dropColumn('atc4_id');
        });
        Schema::enableForeignKeyConstraints();
    }
}
