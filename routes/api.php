<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['api', 'cors']], function ($router) {
    $router->post('login', ['uses' => 'Auth\ApiAuthController@login', 'as' => 'api.login']);
    $router->post('register', ['uses' => 'Auth\ApiAuthController@register', 'as' => 'api.register']);
    $router->post('logout', 'Auth\ApiAuthController@logout');
    $router->get('refresh', 'Auth\ApiAuthController@refresh');
});

Route::namespace('Api')->middleware(['jwt.auth', 'cors'])->group(function($router) {
    $router->get('disease-prevalence/individual-disease', 'DiseasePrevalenceController@getIndividualDisease');
});