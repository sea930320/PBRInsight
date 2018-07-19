<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\BrandPrice\AvgPriceIndex;

use App\Models\PricingAnalytics;
use App\Models\Brand;
use App\Models\Atc5;
use App\Models\Atc4;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\BrandPrice\AvgPriceQueryBuilder;

class BrandPriceController extends ApiController
{
    /**
     * @var PricingAnalytics
     */
    private $pricingAnalytics;

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
     * MoleculePriceController constructor.
     *
     * @param PricingAnalytics $pricingAnalytics
     * @param Brand $brand
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     */
    public function __construct(PricingAnalytics $pricingAnalytics, Brand $brand, Atc5 $atc5, Atc4 $atc4)
    {
        $this->pricingAnalytics = $pricingAnalytics;
        $this->brand = $brand;
        $this->atc5 = $atc5;
        $this->atc4 = $atc4;
    }

    /**
     * @param AvgPriceIndex $request
     *
     * @return JsonResponse
     */
    public function avgPrice(AvgPriceIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new AvgPriceQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->pricingAnalytics->query())
            ->setQueryParams($queryParams);
        // avg wholesale price
        $avgs_wp = $queryBuilder
            ->groupBy('brand_id')
            ->selectRaw('avg(wholesale_price) avg_price, brand_id')
            ->pluck('avg_price', 'brand_id');
        // avg retail pharmacy price
        $avgs_rp = $queryBuilder
            ->groupBy('brand_id')
            ->selectRaw('avg(retail_pharmacy_price) avg_price, brand_id')
            ->pluck('avg_price', 'brand_id');
        // avg hospital price
        $avgs_hp = $queryBuilder
            ->groupBy('brand_id')
            ->selectRaw('avg(hospital_price) avg_price, brand_id')
            ->pluck('avg_price', 'brand_id');
        $brands = $this->brand
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'avgs_wp' => $avgs_wp,
            'avgs_rp' => $avgs_rp,
            'avgs_hp' => $avgs_hp,
            'brands' => $brands
        ]);
    }
}
