<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\TherapyAreaLevelShare\TherapyAreaLevelShareIndex;

use App\Models\Disease;
use App\Models\DiseasePrevalence;
use App\Models\TherapyArea;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc3;
use App\Models\Atc2;

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
     * DiseasePrevalenceController constructor.
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
            ->setQueryParams($queryParams);
        $atcs = $this->{'atc'. $queryParams['atc_level']}
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'total' => $atcShares->count(),
            'atcShares' => $atcShares
                ->select(['atc'. $queryParams['atc_level']. '_id', DB::raw('count(*) as total')])
                ->groupBy('atc'. $queryParams['atc_level']. '_id')
                ->pluck('total','atc'. $queryParams['atc_level']. '_id')->all(),
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
            ->setQueryParams($queryParams);
        $atcs = $this->{'atc'. $queryParams['atc_level']}
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'total' => $atcShares->count(),
            'atcShares' => $atcShares
                ->select(['atc'. $queryParams['atc_level']. '_id', DB::raw('count(*) as total')])
                ->groupBy('atc'. $queryParams['atc_level']. '_id')
                ->pluck('total','atc'. $queryParams['atc_level']. '_id')->all(),
            'atcs' => $atcs
        ]);
    }
}
