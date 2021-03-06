<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\BrandAna\BrandShareIndex;

use App\Models\MarketData;
use App\Models\Brand;
use App\Models\DrugForm;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc2;
use App\Models\Atc1;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\BrandAna\BrandShareQueryBuilder;

class BrandAnayController extends ApiController
{
    /**
     * @var MarketData
     */
    private $marketData;

    /**
     * @var Brand
     */
    private $brand;

    /**
     * @var DrugForm
     */
    private $drug_form;

    /**
     * @var Atc5
     */
    private $atc5;

    /**
     * @var Atc4
     */
    private $atc4;

    /**
     * @var Atc2
     */
    private $atc2;

    /**
     * @var Atc1
     */
    private $atc1;

    /**
     * BrandAnaController constructor.
     *
     * @param MarketData $marketData
     * @param Brand $brand
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     * @param Atc2 $atc2
     * @param Atc1 $atc1
     */
    public function __construct(MarketData $marketData,Brand $brand, Atc5 $atc5, Atc4 $atc4, Atc2 $atc2, Atc1 $atc1, DrugForm $drug_form)
    {
        $this->marketData = $marketData;
        $this->brand = $brand;
        $this->atc5 = $atc5;
        $this->atc4 = $atc4;
        $this->atc2 = $atc2;
        $this->atc1 = $atc1;
        $this->drug_form = $drug_form;
    }

    /**
     * @param BrandShareIndex $request
     *
     * @return JsonResponse
     */
    public function brandShareByAtc(BrandShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new BrandShareQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);

        $totalValue = $queryBuilder->sum('value');
        $totalVolumn = $queryBuilder->sum('volumn');
        $valuations = $queryBuilder
            ->groupBy('brand_id')
            ->selectRaw('sum(value) as total_price, brand_id')
            ->pluck('total_price', 'brand_id');
        $volumns = $queryBuilder
            ->groupBy('brand_id')
            ->selectRaw('sum(volumn) as total_volumn, brand_id')
            ->pluck('total_volumn', 'brand_id');
        $brands = $this->brand
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $totalValue,
            'volumns' => $volumns,
            'totalVolumn' => $totalVolumn,
            'brands' => $brands
        ]);
    }
}
