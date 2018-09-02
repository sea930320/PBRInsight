<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTableExtend extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(FALSE);
            $table->string('company_name')->default('');
            $table->string('title')->default('');
            $table->string('mailing_address')->nullable()->default(null);
            $table->string('city')->nullable()->default(null);
            $table->string('state')->nullable()->default(null);
            $table->string('zip_code')->default('');
            $table->string('country')->default('');
            $table->string('telephone')->default('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_admin']);
            $table->dropColumn(['company_name']);
            $table->dropColumn(['title']);
            $table->dropColumn(['mailing_address']);            
            $table->dropColumn(['city']);
            $table->dropColumn(['state']);
            $table->dropColumn(['zip_code']);
            $table->dropColumn(['country']);
            $table->dropColumn(['telephone']);
        });
    }
}
