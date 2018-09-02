<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\TherapyAreaByPermission;

use Illuminate\Http\JsonResponse;

class TherapyAreaController extends ApiController
{
    /**
     * @var TherapyAreaByPermission
     */
    private $therapyArea;

    /**
     * TherapyAreaController constructor.
     *
     * @param TherapyAreaByPermission $therapyArea
     */
    public function __construct(TherapyAreaByPermission $therapyArea)
    {
        $this->therapyArea = $therapyArea;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'therapy_areas' => $this->therapyArea->get()
        ]);
    }

    /**
     * @param int $id
     *
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $therapyArea = $this->therapyArea->with(['diseases'])
            ->findOrFail($id);

        return $this->respond([
            'therapy_area' => $therapyArea
        ]);
    }
}
