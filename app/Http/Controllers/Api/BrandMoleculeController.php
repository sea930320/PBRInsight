<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\BrandMolecule\BrandShareIndex;
use App\Http\Requests\BrandMolecule\AcShareIndex;

use App\Models\Disease;
use App\Models\DPForTM;
use App\Models\Brand;
use App\Models\ClinicType;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\BrandMolecule\BrandShareQueryBuilder;
use App\Services\QueryBuilders\BrandMolecule\AcShareQueryBuilder;

class BrandMoleculeController extends ApiController
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
     * @var Brand
     */
    private $brand;

    /**
     * @var ClinicType
     */
    private $clinicType;

    /**
     * BrandMoleculeController constructor.
     *
     * @param Disease $disease
     * @param DPForTM $diseasePrevalence
     * @param Brand $brand
     * @param ClinicType $clinicType
     */
    public function __construct(Disease $disease, DPForTM $diseasePrevalence, Brand $brand, ClinicType $clinicType)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->brand = $brand;
        $this->clinicType = $clinicType;
    }

    /**
     * @param DiseaseByBrandIndex $request
     *
     * @return JsonResponse
     */
    public function brandShare(BrandShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new BrandShareQueryBuilder();
        $brandPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->with(['disease', 'disease.therapy_area']))
            ->setQueryParams($queryParams)
            ->select('brand_id', DB::raw("count(brand_id) as total"))
            ->groupBy(['brand_id', 'patient'])
            ->get();
        $total = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');
        $brands = $this->brand
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }        
        return $this->respond([
            'total' => $total,
            'brandPrevalences' => $brandPrevalences
                ->groupBy(['brand_id'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'brands' => $brands
        ]);
    }

    /**
     * @param AcShareIndex $request
     *
     * @return JsonResponse
     */
    public function acShare(AcShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new AcShareQueryBuilder();
        $acPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->with(['disease', 'disease.therapy_area']))
            ->setQueryParams($queryParams);
        $totalTb = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');
        $totalQueryBuilder = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())            
            ->setQueryParams($queryParams);
        if (isset($queryParams['disease_id'])) {
            $acPrevalences = $acPrevalences->where('disease_id', $queryParams['disease_id']);
            $totalQueryBuilder = $totalQueryBuilder
                ->where('disease_id', $queryParams['disease_id']);
        }
        if (isset($queryParams['therapy_area_id'])) {
            $acPrevalences = $acPrevalences->whereHas('disease.therapy_area', function ($query) use ($queryParams) {
                $query->where('id', $queryParams['therapy_area_id']);
            });
            $totalQueryBuilder = $totalQueryBuilder->whereHas('disease.therapy_area', function ($query) use ($queryParams) {
                $query->where('id', $queryParams['therapy_area_id']);
            });
        }
        $total = $totalQueryBuilder
            ->distinct('patient')
            ->count('patient');
        $acPrevalences = $acPrevalences
            ->select('active_constituent', DB::raw("count(active_constituent) as total"))
            ->groupBy(['active_constituent', 'patient'])
            ->get();
        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }    
        return $this->respond([
            'total' => $total,
            'acPrevalences' => $acPrevalences
                ->groupBy(['active_constituent'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'total_tb' => $totalTb
        ]);
    }
}
