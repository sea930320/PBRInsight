<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\PatientFlowMetrics\DiseaseByBrandIndex;
use App\Http\Requests\PatientFlowMetrics\DiseaseByAtcIndex;
use App\Http\Requests\PatientFlowMetrics\DiseaseByAcIndex;

use App\Models\Disease;
use App\Models\DPForPF;
use App\Models\Brand;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc3;
use App\Models\Atc2;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\PatientFlowMetrics\DiseaseByAcQueryBuilder;
use App\Services\QueryBuilders\PatientFlowMetrics\DiseaseByBrandQueryBuilder;
use App\Services\QueryBuilders\PatientFlowMetrics\DiseaseByAtcQueryBuilder;

class PatientFlowMetricsController extends ApiController
{
    /**
     * @var Disease
     */
    private $disease;
    
    /**
     * @var DPForPF
     */
    private $diseasePrevalence;

    /**
     * @var Brand
     */
    private $brand;

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
     * @param DPForPF $diseasePrevalence
     * @param Brand $brand
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     * @param Atc3 $atc3
     * @param Atc2 $atc2
     */
    public function __construct(Disease $disease, DPForPF $diseasePrevalence, Brand $brand, Atc5 $atc5, Atc4 $atc4, Atc3 $atc3, Atc2 $atc2)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->brand = $brand;
        $this->atc5 = $atc5;
        $this->atc4 = $atc4;
        $this->atc3 = $atc3;
        $this->atc2 = $atc2;
    }

    /**
     * @param DiseaseByBrandIndex $request
     *
     * @return JsonResponse
     */
    public function diseaseByBrand(DiseaseByBrandIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiseaseByBrandQueryBuilder();
        $brandPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams);
        $brands = $this->brand
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'total' => $brandPrevalences->distinct('patient')->count('patient'),
            'brandPrevalences' => $brandPrevalences
                ->select(['brand_id', DB::raw('count(*) as total')])
                ->groupBy('brand_id')
                ->pluck('total','brand_id')->all(),
            'brands' => $brands
        ]);
    }

    /**
     * @param DiseaseByAcIndex $request
     *
     * @return JsonResponse
     */
    public function diseaseByAc(DiseaseByAcIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiseaseByAcQueryBuilder();
        $acPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams);
        $totalTb = $acPrevalences->count();
        if (isset($queryParams['disease_id'])) {
            $acPrevalences = $acPrevalences->where('disease_id', $queryParams['disease_id']);
        }
        return $this->respond([
            'total' => $acPrevalences->distinct('patient')->count('patient'),
            'acPrevalences' => $acPrevalences
                ->select(['active_constituent', DB::raw('count(*) as total')])
                ->groupBy('active_constituent')
                ->orderBy('active_constituent')
                ->pluck('total','active_constituent')->all(),
            'total_tb' => $totalTb
        ]);
    }

    /**
     * @param DiseaseByAtcIndex $request
     *
     * @return JsonResponse
     */
    public function diseaseByAtc(DiseaseByAtcIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiseaseByAtcQueryBuilder();
        $atcPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams);
        $atcs = $this->{'atc'. $queryParams['atc_level']}
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'total' => $atcPrevalences->distinct('patient')->count('patient'),
            'atcPrevalences' => $atcPrevalences
                ->select(['atc'. $queryParams['atc_level']. '_id', DB::raw('count(*) as total')])
                ->groupBy('atc'. $queryParams['atc_level']. '_id')
                ->pluck('total','atc'. $queryParams['atc_level']. '_id')->all(),
            'atcs' => $atcs
        ]);
    }
}
