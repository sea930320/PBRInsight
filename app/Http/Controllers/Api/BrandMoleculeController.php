<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\BrandMolecule\BrandShareIndex;

use App\Models\Disease;
use App\Models\DiseasePrevalence;
use App\Models\Brand;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\BrandMolecule\BrandShareQueryBuilder;

class BrandMoleculeController extends ApiController
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
     * @var Brand
     */
    private $brand;

    /**
     * BrandMoleculeController constructor.
     *
     * @param Disease $disease
     * @param DiseasePrevalence $diseasePrevalence
     * @param Brand $brand
     */
    public function __construct(Disease $disease, DiseasePrevalence $diseasePrevalence, Brand $brand)
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
            'total' => $brandPrevalences->count(),
            'brandPrevalences' => $brandPrevalences
                ->select(['brand_id', DB::raw('count(*) as total')])
                ->groupBy('brand_id')
                ->pluck('total','brand_id')->all(),
            'brands' => $brands
        ]);
    }    
}
