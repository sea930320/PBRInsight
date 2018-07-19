<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Pharmaeco;

use Illuminate\Http\JsonResponse;

class CostTreatmentMetricsController extends ApiController
{
    /**
     * @var Pharmaeco
     */
    private $pharmaeco;

    /**
     * CostTreatmentMetricsController constructor.
     *
     * @param Pharmaeco $pharmaeco
     */
    public function __construct(Pharmaeco $pharmaeco)
    {
        $this->pharmaeco = $pharmaeco;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {

        return $this->respond([
            'cost_treatments' => $this->pharmaeco
                                    ->with(['disease'])
                                    ->get(),
            'by_disease_id' => $this->pharmaeco
                                    ->select(['disease_id', 'cost_treatment'])
                                    ->pluck('cost_treatment','disease_id')->all()
        ]);
    }
}
