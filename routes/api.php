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

Route::group(['middleware' => ['api']], function ($router) {
    $router->post('login', ['uses' => 'Auth\ApiAuthController@login', 'as' => 'api.login']);
    $router->post('register', ['uses' => 'Auth\ApiAuthController@register', 'as' => 'api.register']);
    $router->post('logout', 'Auth\ApiAuthController@logout');
    $router->get('refresh', 'Auth\ApiAuthController@refresh');
});

Route::namespace('Api')->middleware(['jwt.auth'])->group(function($router) {
    $router->resource('clinic-type', 'ClinicTypeController');
    $router->resource('therapy-area', 'TherapyAreaController');
    $router->resource('disease', 'DiseaseController');
    $router->resource('population', 'PopulationController');
    $router->resource('age-group-report', 'AgeGroupReportController');
    $router->post('disease-prevalence/individual-disease', 'DiseasePrevalenceController@individualDisease');
    $router->post('disease-prevalence/category', 'DiseasePrevalenceController@category');
    $router->post('disease-prevalence/disease-by-category', 'DiseasePrevalenceController@diseaseByCategory');
    $router->post('patient-flow-metrics/disease-by-ac', 'PatientFlowMetricsController@diseaseByAc');
    $router->post('patient-flow-metrics/disease-by-brand', 'PatientFlowMetricsController@diseaseByBrand');
    $router->post('patient-flow-metrics/disease-by-atc', 'PatientFlowMetricsController@diseaseByAtc');
    $router->post('co-morbidities', 'CoMorbiditiesController@index');
    $router->post('therapy-area-level-share/by-disease', 'TherapyAreaLevelShareController@byDisease');
    $router->post('therapy-area-level-share/by-therapy-area', 'TherapyAreaLevelShareController@byTherapyArea');
    $router->post('brand-molecule/brand-share', 'BrandMoleculeController@brandShare');
    $router->post('brand-molecule/ac-share', 'BrandMoleculeController@acShare');
    $router->post('diagnotics/classification-share', 'DiagoticsController@classificationShare');
    $router->post('diagnotics/sub-ana1-share', 'DiagoticsController@subAna1Share');
    $router->post('diagnotics/sub-ana2-share', 'DiagoticsController@subAna2Share');
    $router->post('diagnotics/clinic-share', 'DiagoticsController@clinicShareBySubAna');
    $router->post('diagnotics/facility-share', 'DiagoticsController@facilityShareBySubAna');
});