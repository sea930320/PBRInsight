<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\DiseasePrevalence\IndividualDiseaseIndex;
use App\Http\Requests\DiseasePrevalence\CategoryIndex;
use App\Http\Requests\DiseasePrevalence\DiseaseByCategoryIndex;

use App\Models\Disease;
use App\Models\DiseasePrevalence;
use App\Models\TherapyArea;

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
     * DiseasePrevalenceController constructor.
     *
     * @param Disease $disease
     * @param DiseasePrevalence $diseasePrevalence
     * @param TherapyArea $therapyArea
     */
    public function __construct(Disease $disease, DiseasePrevalence $diseasePrevalence, TherapyArea $therapyArea)
    {
        $this->disease = $disease;
        $this->diseasePrevalence = $diseasePrevalence;
        $this->therapyArea = $therapyArea;
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
            ->setQueryParams($queryParams);
        $total = $individualPrevalences->distinct('patient')->count('patient');

        $individualDiseases = $this->disease
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'total' => $total,
            'individualPrevalences' => $individualPrevalences
                ->select('disease_id', DB::raw("count(*) as total"))
                ->groupBy(['disease_id'])
                ->pluck('total','disease_id')->all(),
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
        $individualPrevalences = $queryBuilder
            ->setQuery($this->diseasePrevalence->query())
            ->setQueryParams($queryParams);
        $total = $individualPrevalences->distinct('patient')->count('patient');

        $individualPrevalences = $individualPrevalences
            ->select('disease_id', DB::raw("count(*) as total"))
            ->groupBy(['disease_id'])
            ->pluck('total','disease_id')->all();
        $therapyAreas = $this->therapyArea->with(['diseases'])->get()->toArray();
        $therapyAreaPrevalences = [];
        foreach ($therapyAreas as $key => $therapyArea) {
            $count = 0;
            foreach ($therapyArea['diseases'] as $key => $disease) {
                $count += array_key_exists($disease['id'], $individualPrevalences) ? $individualPrevalences[$disease['id']]:0;
            }
            $therapyAreaPrevalences[$therapyArea['id']] = $count;
        }
        return $this->respond([
            'total' => $total,
            'therapyAreaPrevalences' => $therapyAreaPrevalences,
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
            ->setQueryParams($queryParams);
        $individualDiseases = $this->disease
            ->where('therapy_area_id', $queryParams['therapy_area_id'])
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
        return $this->respond([
            'total' => $individualPrevalences->distinct('patient')->count('patient'),
            'individualPrevalencesByCategory' => $individualPrevalences                
                ->select('disease_id', DB::raw("count(*) as total"))
                ->groupBy(['disease_id'])
                ->pluck('total','disease_id')->all(),
            'individualDiseasesByCategory' => $individualDiseases
        ]);
    }
}
