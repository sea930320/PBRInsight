<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\MoleculeAna\MoleculeShareIndex;

use App\Models\MarketData;
use App\Models\Brand;
use App\Models\DrugForm;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc2;
use App\Models\Atc1;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\MoleculeAna\MoleculeShareQueryBuilder;

class MoleculeAnaController extends ApiController
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
     * MoleculeAnaController constructor.
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
     * @param MoleculeShareIndex $request
     *
     * @return JsonResponse
     */
    public function moleculeShareByAtc(MoleculeShareIndex $request): JsonResponse
    {
        // $queryParams = $request->validatedOnly();
        // $queryBuilder = new MoleculeShareQueryBuilder();
        // $queryBuilder = $queryBuilder
        //     ->setQuery($this->marketData->query())
        //     ->setQueryParams($queryParams);

        // $total = $queryBuilder->count();
        // $totalValue = $queryBuilder->sum('value');
        // $valuations = $queryBuilder
        //     ->groupBy('brand_id')
        //     ->selectRaw('sum(value) as total_price, brand_id')
        //     ->pluck('total_price', 'brand_id');
        // $brandShares = $queryBuilder
        //     ->select('brand_id', DB::raw("count(brand_id) as total"))
        //     ->groupBy('brand_id')
        //     ->pluck('total', 'brand_id');
        // $brands = $this->brand
        //     ->select(['id', 'name'])
        //     ->pluck('name','id')->all();

        // return $this->respond([
        //     'valuations' => $valuations,
        //     'totalValue' => $totalValue,
        //     'shares' => $brandShares,
        //     'total' => $total,
        //     'brands' => $brands
        // ]);
    }
}
