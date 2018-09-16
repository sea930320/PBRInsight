<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\TherapyAreaLevelShare\TherapyAreaLevelShareIndex;

use App\Models\Disease;
use App\Models\DPForTM;
use App\Models\TherapyArea;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc3;
use App\Models\Atc2;
use App\Models\ClinicType;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\TherapyAreaLevel\TherapyAreaLevelQueryBuilder;

class TherapyAreaLevelShareController extends ApiController
{
    /**
     * @var Disease
     */
    private $disease;
    
    /**
     * @var DPForTM
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
     * @var ClinicType
     */
    private $clinicType;

    /**
     * DiseasePrevalenceController constructor.
     *
     * @param Disease $disease
     * @param DPForTM $diseasePrevalence
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     * @param Atc3 $atc3
     * @param Atc2 $atc2
     * @param ClinicType $clinicType
     */
    public function __construct(Disease $disease, DPForTM $diseasePrevalence, Atc5 $atc5, Atc4 $atc4, Atc3 $atc3, Atc2 $atc2, ClinicType $clinicType)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->atc5 = $atc5;
        $this->atc4 = $atc4;
        $this->atc3 = $atc3;
        $this->atc2 = $atc2;
        $this->clinicType = $clinicType;
    }

    /**
     * @param TherapyAreaLevelShareIndex $request
     *
     * @return JsonResponse
     */
    public function byDisease(TherapyAreaLevelShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new TherapyAreaLevelQueryBuilder();
        $atcShares = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->select('atc'. $queryParams['atc_level']. '_id', DB::raw("count(".'atc'. $queryParams['atc_level']. '_id'. ") as total"))
            ->groupBy(['atc'. $queryParams['atc_level']. '_id', 'patient'])
            ->get();
        $total = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');
        $atcs = $this->{'atc'. $queryParams['atc_level']}
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }
            
        return $this->respond([
            'total' => $total,
            'atcShares' => $atcShares
                ->groupBy(['atc'. $queryParams['atc_level']. '_id'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'atcs' => $atcs
        ]);
    }

    /**
     * @param TherapyAreaLevelShareIndex $request
     *
     * @return JsonResponse
     */
    public function byTherapyArea(TherapyAreaLevelShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new TherapyAreaLevelQueryBuilder();
        $atcShares = $queryBuilder
            ->setQuery($this->diseasePrevalence->with(['disease', 'disease.therapy_area']))
            ->setQueryParams($queryParams)
            ->select('atc'. $queryParams['atc_level']. '_id', DB::raw("count(".'atc'. $queryParams['atc_level']. '_id'. ") as total"))
            ->groupBy(['atc'. $queryParams['atc_level']. '_id', 'patient'])
            ->get();
        $total = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');
        $atcs = $this->{'atc'. $queryParams['atc_level']}
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
        
        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }    
        return $this->respond([
            'total' => $total,
            'atcShares' => $atcShares
                ->groupBy(['atc'. $queryParams['atc_level']. '_id'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'atcs' => $atcs
        ]);
    }
}
