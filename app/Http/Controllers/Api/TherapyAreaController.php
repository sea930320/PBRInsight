<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\TherapyAreaByPermission;
use App\Models\TherapyAreaForPF;
use App\Models\TherapyAreaForTM;
use App\Models\TherapyArea;

use Illuminate\Http\JsonResponse;

class TherapyAreaController extends ApiController
{
    /**
     * @var TherapyAreaByPermission
     */
    private $therapyAreaByPermission;

    /**
     * @var TherapyAreaForPF
     */
    private $therapyAreaForPF;

    /**
     * @var TherapyAreaForTM
     */
    private $therapyAreaForTM;

    /**
     * @var TherapyArea
     */
    private $therapyArea;
    /**
     * TherapyAreaController constructor.
     *
     * @param TherapyAreaByPermission $therapyAreaByPermission
     * @param TherapyArea $therapyArea
     * @param TherapyAreaForPF $therapyAreaForPF
     * @param TherapyAreaForTM $therapyAreaForTM
     */
    public function __construct(TherapyAreaByPermission $therapyAreaByPermission, TherapyArea $therapyArea, TherapyAreaForPF $therapyAreaForPF, TherapyAreaForTM $therapyAreaForTM)
    {
        $this->therapyAreaByPermission = $therapyAreaByPermission;
        $this->therapyArea = $therapyArea;
        $this->therapyAreaForPF = $therapyAreaForPF;
        $this->therapyAreaForTM = $therapyAreaForTM;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        switch ($request->get('category')) {
            case 'patient_forecasting':
                return $this->respond([
                    'therapy_areas' => $this->therapyAreaForPF->get()
                ]);
                break;
            case 'treatment_mapping':
                return $this->respond([
                    'therapy_areas' => $this->therapyAreaForTM->get()
                ]);
                break;
            default:
                return $this->respond([
                    'therapy_areas' => $this->therapyAreaByPermission->get()
                ]);
                break;
        }
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function getAllTherapyAreas(Request $request): JsonResponse
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
