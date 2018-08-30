<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\MarketView\TotalMarketValuationIndex;
use App\Http\Requests\MarketView\MarketShareIndex;
use App\Http\Requests\MarketView\AnatomicalClassShareIndex;
use App\Http\Requests\MarketView\Atc2ShareIndex;

use App\Models\MarketData;
use App\Models\DrugForm;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc2;
use App\Models\Atc1;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\MarketView\MarketShareQueryBuilder;
use App\Services\QueryBuilders\MarketView\AnatomicalClassShareQueryBuilder;
use App\Services\QueryBuilders\MarketView\Atc2ShareQueryBuilder;

class MarketViewController extends ApiController
{
    /**
     * @var MarketData
     */
    private $marketData;

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
     * MarketViewController constructor.
     *
     * @param MarketData $marketData
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     * @param Atc2 $atc2
     * @param Atc1 $atc1
     * @param DrugForm $drug_form
     */
    public function __construct(MarketData $marketData, Atc5 $atc5, Atc4 $atc4, Atc2 $atc2, Atc1 $atc1, DrugForm $drug_form)
    {
        $this->marketData = $marketData;
        $this->atc5 = $atc5;
        $this->atc4 = $atc4;
        $this->atc2 = $atc2;
        $this->atc1 = $atc1;
        $this->drug_form = $drug_form;
    }

    /**
     * @param TotalMarketValuationIndex $request
     *
     * @return JsonResponse
     */
    public function totalMarketValuation(TotalMarketValuationIndex $request): JsonResponse
    {
        $valuations = $this->marketData
            ->groupBy('year')
            ->selectRaw('sum(value) as total_price, year')
            ->pluck('total_price', 'year');

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $this->marketData->sum('value')
        ]);
    }

    /**
     * @param MarketShareIndex $request
     *
     * @return JsonResponse
     */
    public function marketShareBySegment(MarketShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new MarketShareQueryBuilder();
        $valuations = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);

        $totalValue = $valuations->sum('value');
        $valuations = $valuations
            ->groupBy('drug_form_id')
            ->selectRaw('sum(value) as total_price, drug_form_id')
            ->pluck('total_price', 'drug_form_id');

        $drug_forms = $this->drug_form
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'drugForms' => $drug_forms,
            'totalValue' => $totalValue
        ]);
    }

    /**
     * @param AnatomicalClassShareIndex $request
     *
     * @return JsonResponse
     */
    public function anatomicalClassShare(AnatomicalClassShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new AnatomicalClassShareQueryBuilder();
        $valuations = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);
            
        $totalValue = $valuations->sum('value');
        $valuations = $valuations
            ->groupBy('atc1_id')
            ->selectRaw('sum(value) as total_price, atc1_id')
            ->pluck('total_price', 'atc1_id');

        $atc1s = $this->atc1
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'atc1s' => $atc1s,
            'totalValue' => $totalValue
        ]);
    }

    /**
     * @param Atc2ShareIndex $request
     *
     * @return JsonResponse
     */
    public function atc2Share(Atc2ShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new Atc2ShareQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);
        $total = $queryBuilder->count();
        $totalValue = $queryBuilder->sum('value');
        $valuations = $queryBuilder
            ->groupBy('atc2_id')
            ->selectRaw('sum(value) as total_price, atc2_id')
            ->pluck('total_price', 'atc2_id');
        $atc2Shares = $queryBuilder
            ->select('atc2_id', DB::raw("count(atc2_id) as total"))
            ->groupBy('atc2_id')
            ->pluck('total', 'atc2_id');
        $atc2s = $this->atc2
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $totalValue,
            'atc2Shares' => $atc2Shares,
            'total' => $total,
            'atc2s' => $atc2s
        ]);
    }
}
