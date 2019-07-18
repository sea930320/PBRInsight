<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\MoleculeAna\MoleculeShareIndex;

use App\Models\MarketData;
use App\Models\GenericName;
use App\Models\DrugForm;
use App\Models\Atc5;
use App\Models\Atc4;
use App\Models\Atc2;
use App\Models\Atc1;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\MoleculeAna\MoleculeShareQueryBuilder;

class MoleculeAnayController extends ApiController
{
    /**
     * @var MarketData
     */
    private $marketData;

    /**
     * @var GenericName
     */
    private $generic_name;

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
     * @param GenericName $generic_name
     * @param Atc5 $atc5
     * @param Atc4 $atc4
     * @param Atc2 $atc2
     * @param Atc1 $atc1
     */
    public function __construct(MarketData $marketData,GenericName $generic_name, Atc5 $atc5, Atc4 $atc4, Atc2 $atc2, Atc1 $atc1, DrugForm $drug_form)
    {
        $this->marketData = $marketData;
        $this->generic_name = $generic_name;
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
        $queryParams = $request->validatedOnly();
        $queryBuilder = new MoleculeShareQueryBuilder();
        $queryBuilder = $queryBuilder
            ->setQuery($this->marketData->query())
            ->setQueryParams($queryParams);

        $totalValue = $queryBuilder->sum('value');
        $totalVolumn = $queryBuilder->sum('volumn');
        $totalIms = $queryBuilder->sum('ims_equivalent');
        $valuations = $queryBuilder
            ->groupBy('generic_name_id')
            ->selectRaw('sum(value) as total_price, generic_name_id')
            ->pluck('total_price', 'generic_name_id');
        $volumns = $queryBuilder
            ->groupBy('generic_name_id')
            ->selectRaw('sum(volumn) as total_volumn, generic_name_id')
            ->pluck('total_volumn', 'generic_name_id');
        $imses = $queryBuilder
            ->groupBy('generic_name_id')
            ->selectRaw('sum(ims_equivalent) as total_ims, generic_name_id')
            ->pluck('total_ims', 'generic_name_id');
        $generic_names = $this->generic_name
            ->select(['id', 'name'])
            ->pluck('name','id')->all();

        return $this->respond([
            'valuations' => $valuations,
            'totalValue' => $totalValue,
            'volumns' => $volumns,
            'totalVolumn' => $totalVolumn,
            'imses' => $imses,
            'totalIms' => $totalIms,
            'generic_names' => $generic_names
        ]);
    }
}
