<?php

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.

Route::group([
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => ['web', config('backpack.base.middleware_key', 'admin')],
    'namespace'  => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::resource('users', 'UsersController');
    Route::get('users/{id}/permissions', 'UsersController@editPermissions')->name('users.permission');
    Route::post('users/{id}/permissions', 'UsersController@savePermissions')->name('users.permission.save');
}); // this should be the absolute last line of this file
