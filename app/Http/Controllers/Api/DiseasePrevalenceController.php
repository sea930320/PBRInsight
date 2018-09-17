<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\DiseasePrevalence\IndividualDiseaseIndex;
use App\Http\Requests\DiseasePrevalence\CategoryIndex;
use App\Http\Requests\DiseasePrevalence\DiseaseByCategoryIndex;

use App\Models\Disease;
use App\Models\DiseasePrevalence;
use App\Models\TherapyArea;
use App\Models\ClinicType;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\DiseasePrevalence\IndividualDiseaseQueryBuilder;

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
     * @var TherapyArea
     */
    private $therapyArea;

    /**
     * @var ClinicType
     */
    private $clinicType;

    /**
     * DiseasePrevalenceController constructor.
     *
     * @param Disease $disease
     * @param DiseasePrevalence $diseasePrevalence
     * @param TherapyArea $therapyArea
     * @param ClinicType $clinicType
     */
    public function __construct(Disease $disease, DiseasePrevalence $diseasePrevalence, TherapyArea $therapyArea, ClinicType $clinicType)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->therapyArea = $therapyArea;
        $this->clinicType = $clinicType;
    }

    /**
     * @param IndividualDiseaseIndex $request
     *
     * @return JsonResponse
     */
    public function individualDisease(IndividualDiseaseIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new IndividualDiseaseQueryBuilder();
        $individualPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->select('disease_id', DB::raw("count(disease_id) as total"))
            ->groupBy(['disease_id', 'patient'])
            ->get();
        $total = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');

        $individualDiseases = $this->disease
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }
        return $this->respond([
            'total' => $total,
            'individualPrevalences' => $individualPrevalences
                ->groupBy(['disease_id'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'individualDiseases' => $individualDiseases
        ]);
    }

    /**
     * @param CategoryIndex $request
     *
     * @return JsonResponse
     */
    public function category(CategoryIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new IndividualDiseaseQueryBuilder();
        $therapyAreaPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->select('therapy_area_id', DB::raw("count(therapy_area_id) as total"))
            ->groupBy(['therapy_area_id', 'patient'])
            ->get();
        $total = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');
        
        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }
        // $therapyAreas = $this->therapyArea->with(['diseases'])->get()->toArray();
        // $therapyAreaPrevalences = [];
        // foreach ($therapyAreas as $key => $therapyArea) {
        //     $count = 0;
        //     foreach ($therapyArea['diseases'] as $key => $disease) {
        //         $count += array_key_exists($disease['id'], $individualPrevalences) ? $individualPrevalences[$disease['id']]:0;
        //     }
        //     $therapyAreaPrevalences[$therapyArea['id']] = $count;
        // }
        return $this->respond([
            'total' => $total,
            'therapyAreaPrevalences' => $therapyAreaPrevalences
                ->groupBy(['therapy_area_id'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'therapyAreas' => $this->therapyArea
                ->select(['id', 'name'])
                ->pluck('name','id')->all()
        ]);
    }

    /**
     * @param DiseaseByCategoryIndex $request
     *
     * @return JsonResponse
     */
    public function diseaseByCategory(DiseaseByCategoryIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new IndividualDiseaseQueryBuilder();
        $individualPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->with(['disease', 'disease.therapy_area']))
            ->setQueryParams($queryParams)
            ->select('disease_id', DB::raw("count(disease_id) as total"))
            ->groupBy(['disease_id', 'patient'])
            ->get();
        $total = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams)
            ->distinct('patient')
            ->count('patient');
        $individualDiseases = $this->disease
            ->where('therapy_area_id', $queryParams['therapy_area_id'])
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
        $mul = 1;
        if (isset($queryParams['clinic_type_id']) && isset($queryParams['start_year']) && $queryParams['start_year'] == 2017) {
            $mul = $this->clinicType->find($queryParams['clinic_type_id'])['2017_multiply'];
        }
        return $this->respond([
            'total' => $total,
            'individualPrevalencesByCategory' => $individualPrevalences
                ->groupBy(['disease_id'])
                ->map(function($item, $key) use ($mul) {
                    return collect($item)->count() * $mul;
                }),
            'individualDiseasesByCategory' => $individualDiseases
        ]);
    }
}
