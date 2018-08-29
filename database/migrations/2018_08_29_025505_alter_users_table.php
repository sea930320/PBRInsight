<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable()->after('last_login_at');
            $table->timestamp('current_login_at')->nullable()->after('last_login_ip');
            $table->string('current_login_ip')->nullable()->after('current_login_at');
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
            $table->dropColumn(['last_login_at']);
            $table->dropColumn(['last_login_ip']);
            $table->dropColumn(['current_login_at']);            
            $table->dropColumn(['current_login_ip']);
        });
    }
}
