<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Disease;

use Illuminate\Http\JsonResponse;

class DiseaseController extends ApiController
{
    /**
     * @var Disease
     */
    private $disease;

    /**
     * DiseaseController constructor.
     *
     * @param Disease $disease
     */
    public function __construct(Disease $disease)
    {
        $this->disease = $disease;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'diseases' => $this->disease->with(['therapy_area'])->get()
        ]);
    }
}
