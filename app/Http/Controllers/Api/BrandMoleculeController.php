<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\BrandMolecule\BrandShareIndex;
use App\Http\Requests\BrandMolecule\AcShareIndex;

use App\Models\Disease;
use App\Models\DPForTM;
use App\Models\Brand;

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
     * BrandMoleculeController constructor.
     *
     * @param Disease $disease
     * @param DPForTM $diseasePrevalence
     * @param Brand $brand
     */
    public function __construct(Disease $disease, DPForTM $diseasePrevalence, Brand $brand)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->brand = $brand;
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
        $totalTb = $acPrevalences->count();
        if (isset($queryParams['disease_id'])) {
            $acPrevalences = $acPrevalences->where('disease_id', $queryParams['disease_id']);
        }
        if (isset($queryParams['therapy_area_id'])) {
            $acPrevalences = $acPrevalences->whereHas('disease.therapy_area', function ($query) use ($queryParams) {
                $query->where('id', $queryParams['therapy_area_id']);
            });
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
}
