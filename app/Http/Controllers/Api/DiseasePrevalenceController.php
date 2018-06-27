<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\DiseasePrevalence\IndividualDiseaseIndex;

use App\Models\Disease;
use App\Models\DiseasePrevalence;

use Illuminate\Http\JsonResponse;
use DB;

class DiseasePrevalenceController extends ApiController
{
    /**
     * @var Disease
     */
    private $disease;
    
    /**
     * @var DiseasePrevalence
     */
    private $diseasePrevalence;

    /**
     * DiseasePrevalenceController constructor.
     *
     * @param Disease $disease
     * @param DiseasePrevalence $diseasePrevalence
     */
    public function __construct(Disease $disease, DiseasePrevalence $diseasePrevalence)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
    }

    /**
     * @param IndividualDiseaseIndex $request
     *
     * @return JsonResponse
     */
    public function getIndividualDisease(IndividualDiseaseIndex $request): JsonResponse
    {
        $individualPrevalences = $this->diseasePrevalence
            ->with(['disease'])
            ->select(['disease_id', DB::raw('count(*) as total')])
            ->groupBy('disease_id')
            ->pluck('total','disease_id')->all();
        $individualDiseases = $this->disease
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'individualPrevalences' => $individualPrevalences,
            'individualDiseases' => $individualDiseases,
            'total' => $this->diseasePrevalence->count()
        ]);
    }
}
