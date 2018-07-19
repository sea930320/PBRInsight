<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\MoleculePrice\AvgPriceIndex;

use App\Models\PricingAnalytics;
use App\Models\Atc5;
use App\Models\Atc4;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\MoleculePrice\AvgPriceQueryBuilder;

class MoleculePriceController extends ApiController
{
    /**
     * @var PricingAnalytics
     */
    private $pricingAnalytics;

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
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     */
    public function __construct(PricingAnalytics $pricingAnalytics, Atc5 $atc5, Atc4 $atc4)
    {
        $this->pricingAnalytics = $pricingAnalytics;
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
            ->groupBy('atc5_id')
            ->selectRaw('avg(wholesale_price) avg_price, atc5_id')
            ->pluck('avg_price', 'atc5_id');
        // avg retail pharmacy price
        $avgs_rp = $queryBuilder
            ->groupBy('atc5_id')
            ->selectRaw('avg(retail_pharmacy_price) avg_price, atc5_id')
            ->pluck('avg_price', 'atc5_id');
        // avg hospital price
        $avgs_hp = $queryBuilder
            ->groupBy('atc5_id')
            ->selectRaw('avg(hospital_price) avg_price, atc5_id')
            ->pluck('avg_price', 'atc5_id');
        $atc5s = $this->atc5
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'avgs_wp' => $avgs_wp,
            'avgs_rp' => $avgs_rp,
            'avgs_hp' => $avgs_hp,
            'atc5s' => $atc5s
        ]);
    }

    /**
     * @param AvgPriceIndex $request
     *
     * @return JsonResponse
     */
    public function avgPriceByAc(AvgPriceIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new AvgPriceQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->pricingAnalytics->query())
            ->setQueryParams($queryParams);
        // avg wholesale price
        $avgs_wp = $queryBuilder
            ->groupBy('active_constituent')
            ->selectRaw('avg(wholesale_price) avg_price, active_constituent')
            ->pluck('avg_price', 'active_constituent');
        // avg retail pharmacy price
        $avgs_rp = $queryBuilder
            ->groupBy('active_constituent')
            ->selectRaw('avg(retail_pharmacy_price) avg_price, active_constituent')
            ->pluck('avg_price', 'active_constituent');
        // avg hospital price
        $avgs_hp = $queryBuilder
            ->groupBy('active_constituent')
            ->selectRaw('avg(hospital_price) avg_price, active_constituent')
            ->pluck('avg_price', 'active_constituent');

        return $this->respond([
            'avgs_wp' => $avgs_wp,
            'avgs_rp' => $avgs_rp,
            'avgs_hp' => $avgs_hp,
        ]);
    }
}
