<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\ClinicType;

use Illuminate\Http\JsonResponse;

class ClinicTypeController extends ApiController
{
    /**
     * @var ClinicType
     */
    private $clinicType;

    /**
     * ClinicTypeController constructor.
     *
     * @param ClinicType $clinicType
     */
    public function __construct(ClinicType $clinicType)
    {
        $this->clinicType = $clinicType;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'clinic_types' => $this->clinicType->get()
        ]);
    }
}
