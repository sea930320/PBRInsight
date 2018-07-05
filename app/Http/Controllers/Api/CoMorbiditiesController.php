<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\CoMorbidities\CoMorbiditiesIndex;

use App\Models\Disease;
use App\Models\DiseasePrevalence;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc3;
use App\Models\Atc2;

use Illuminate\Http\JsonResponse;
use DB;
use \stdClass;
use App\Services\QueryBuilders\CoMorbidities\CoMorbiditiesQueryBuilder;

class CoMorbiditiesController extends ApiController
{
/**
     * @var Disease
     */
    private $disease;
    
    /**
     * @var DiseasePrevalence
     */
    private $diseasePrevalence;

    /**
     * @var Atc5
     */
    private $atc5;

    /**
     * @var Atc4
     */
    private $atc4;

    /**
     * @var Atc3
     */
    private $atc3;

    /**
     * @var Atc2
     */
    private $atc2;

    /**
     * CoMorbiditiesController constructor.
     *
     * @param Disease $disease
     * @param DiseasePrevalence $diseasePrevalence
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     * @param Atc3 $atc3
     * @param Atc2 $atc2
     */
    public function __construct(Disease $disease, DiseasePrevalence $diseasePrevalence, Atc5 $atc5, Atc4 $atc4, Atc3 $atc3, Atc2 $atc2)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->atc5 = $atc5;
        $this->atc4 = $atc4;
        $this->atc3 = $atc3;
        $this->atc2 = $atc2;
    }

    /**
     * @param CoMorbiditiesIndex $request
     *
     * @return JsonResponse
     */
    public function index(CoMorbiditiesIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new CoMorbiditiesQueryBuilder();
        $diseasesByPatient = $queryBuilder
            ->setQuery($this->diseasePrevalence->with(['disease', 'disease.therapy_area']))
            ->setQueryParams($queryParams)
            ->get()
            ->groupBy(['patient', 'disease_id'])
            ->map(function($item, $key) {
                return collect($item)->count();
            })->toArray();
        $coMorbidities = new stdClass();
        $total = 0;
        foreach ($diseasesByPatient as $key => $diseaseCountByPatient) {
            if ($diseaseCountByPatient == 1) continue;
            $patient = (new CoMorbiditiesQueryBuilder())
                ->setQuery($this->diseasePrevalence->with(['disease', 'disease.therapy_area']))
                ->setQueryParams($queryParams)
                ->where('patient', $key)
                ->get(['patient', 'active_constituent', 'disease_id']);
            if (isset($coMorbidities->{"${diseaseCountByPatient}"})) {
                $coMorbidities->{"$diseaseCountByPatient"}->count ++;
                $coMorbidities->{"$diseaseCountByPatient"}->patients[] = $patient;
            } else {
                $coMorbidities->{"$diseaseCountByPatient"} = new StdClass();
                $coMorbidities->{"$diseaseCountByPatient"}->count = 1;
                $coMorbidities->{"$diseaseCountByPatient"}->patients = [$patient];
            }
            $total ++;
        }
        return $this->respond([
            'coMorbidities' => $coMorbidities,
            'total' => $total
        ]);
    }
}
