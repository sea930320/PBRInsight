<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\DiseaseByPermission;
use App\Models\DiseaseForPF;
use App\Models\DiseaseForTM;

use Illuminate\Http\JsonResponse;

class DiseaseController extends ApiController
{
    /**
     * @var DiseaseByPermission
     */
    private $disease;
    /**
     * @var DiseaseForPF
     */
    private $diseaseForPF;
    /**
     * @var DiseaseForTM
     */
    private $diseaseForTM;

    /**
     * DiseaseController constructor.
     *
     * @param DiseaseByPermission $disease
     * @param DiseaseForPF $diseaseForPF
     * @param DiseaseForTM $diseaseForTM
     */
    public function __construct(DiseaseByPermission $disease, DiseaseForPF $diseaseForPF, DiseaseForTM $diseaseForTM)
    {
        $this->disease = $disease;
        $this->diseaseForPF = $diseaseForPF;
        $this->diseaseForTM = $diseaseForTM;
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
                    'diseases' => $this->diseaseForPF->with(['therapy_area'])->get()
                ]);
                break;
            case 'treatment_mapping':
                return $this->respond([
                    'diseases' => $this->diseaseForTM->with(['therapy_area'])->get()
                ]);
                break;
            default:
                return $this->respond([
                    'diseases' => $this->disease->with(['therapy_area'])->get()
                ]);
                break;
        }
    }
}
