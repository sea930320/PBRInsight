<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\DiseaseByPermission;

use Illuminate\Http\JsonResponse;

class DiseaseController extends ApiController
{
    /**
     * @var DiseaseByPermission
     */
    private $disease;

    /**
     * DiseaseController constructor.
     *
     * @param DiseaseByPermission $disease
     */
    public function __construct(DiseaseByPermission $disease)
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
