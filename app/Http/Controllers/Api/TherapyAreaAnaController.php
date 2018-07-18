<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\TherapyAreaAna\Atc2ShareIndex;
use App\Http\Requests\TherapyAreaAna\Atc4ShareIndex;
use App\Http\Requests\TherapyAreaAna\Atc5ShareIndex;

use App\Models\MarketData;
use App\Models\DrugForm;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc2;
use App\Models\Atc1;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\TherapyAreaAna\Atc2ShareQueryBuilder;
use App\Services\QueryBuilders\TherapyAreaAna\Atc4ShareQueryBuilder;
use App\Services\QueryBuilders\TherapyAreaAna\Atc5ShareQueryBuilder;

class TherapyAreaAnaController extends ApiController
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

        $totalValue = $queryBuilder->sum('value');
        $totalVolumn = $queryBuilder->sum('volumn');

        $valuations = $queryBuilder
            ->groupBy('atc2_id')
            ->selectRaw('sum(value) as total_price, atc2_id')
            ->pluck('total_price', 'atc2_id');
        $volumns = $queryBuilder
            ->groupBy('atc2_id')
            ->selectRaw('sum(volumn) as total_volumn, atc2_id')
            ->pluck('total_volumn', 'atc2_id');

        $atc2s = $this->atc2
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $totalValue,
            'volumns' => $volumns,
            'totalVolumn' => $totalVolumn,
            'atc2s' => $atc2s
        ]);
    }

    /**
     * @param Atc4ShareIndex $request
     *
     * @return JsonResponse
     */
    public function atc4Share(Atc4ShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new Atc4ShareQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);

        $totalValue = $queryBuilder->sum('value');
        $totalVolumn = $queryBuilder->sum('volumn');

        $valuations = $queryBuilder
            ->groupBy('atc4_id')
            ->selectRaw('sum(value) as total_price, atc4_id')
            ->pluck('total_price', 'atc4_id');
        $volumns = $queryBuilder
            ->groupBy('atc4_id')
            ->selectRaw('sum(volumn) as total_volumn, atc4_id')
            ->pluck('total_volumn', 'atc4_id');

        $atc4s = $this->atc4
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $totalValue,
            'volumns' => $volumns,
            'totalVolumn' => $totalVolumn,
            'atc4s' => $atc4s
        ]);
    }

    /**
     * @param Atc5ShareIndex $request
     *
     * @return JsonResponse
     */
    public function atc5Share(Atc5ShareIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new Atc5ShareQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);

        $totalValue = $queryBuilder->sum('value');
        $totalVolumn = $queryBuilder->sum('volumn');

        $valuations = $queryBuilder
            ->groupBy('atc5_id')
            ->selectRaw('sum(value) as total_price, atc5_id')
            ->pluck('total_price', 'atc5_id');
        $volumns = $queryBuilder
            ->groupBy('atc5_id')
            ->selectRaw('sum(volumn) as total_volumn, atc5_id')
            ->pluck('total_volumn', 'atc5_id');

        $atc5s = $this->atc5
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $totalValue,
            'volumns' => $volumns,
            'totalVolumn' => $totalVolumn,
            'atc5s' => $atc5s
        ]);
    }
}
