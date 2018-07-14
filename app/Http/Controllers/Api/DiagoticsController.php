<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\Diagnotics\DiagnoticsIndex;

use App\Models\Diagnotics;
use App\Models\ClinicType;

use Illuminate\Http\JsonResponse;
use DB;
use App\Services\QueryBuilders\Diagnotics\DiagnoticsQueryBuilder;

class DiagoticsController extends ApiController
{
    /**
     * @var Diagnotics
     */
    private $diagnotics;

    /**
     * @var ClinicType
     */
    private $clinicType;

    /**
     * DiagoticsController constructor.
     *
     * @param Diagnotics $diagnotics
     * @param ClinicType $clinicType
     */
    public function __construct(Diagnotics $diagnotics, ClinicType $clinicType)
    {
        $this->diagnotics = $diagnotics;
        $this->clinicType = $clinicType;
    }

    /**
     * @param DiagnoticsIndex $request
     *
     * @return JsonResponse
     */
    public function classificationShare(DiagnoticsIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiagnoticsQueryBuilder();
        $classificationShares = $queryBuilder
            ->setQuery($this->diagnotics->query())
            ->setQueryParams($queryParams);
            
        return $this->respond([
            'total' => $classificationShares->count(),
            'classificationShares' => $classificationShares                
                ->select('classification', DB::raw("count(classification) as total"))
                ->groupBy(['classification'])
                ->pluck('total','classification')->all()
        ]);
    }

    /**
     * @param DiagnoticsIndex $request
     *
     * @return JsonResponse
     */
    public function subAna1Share(DiagnoticsIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiagnoticsQueryBuilder();
        $subAna1Shares = $queryBuilder
            ->setQuery($this->diagnotics->query())
            ->setQueryParams($queryParams);
            
        return $this->respond([
            'total' => $subAna1Shares->count(),
            'subAna1Shares' => $subAna1Shares                
                ->select('sub_analysis_1', DB::raw("count(sub_analysis_1) as total"))
                ->groupBy(['sub_analysis_1'])
                ->pluck('total','sub_analysis_1')->all()
        ]);
    }

    /**
     * @param DiagnoticsIndex $request
     *
     * @return JsonResponse
     */
    public function subAna2Share(DiagnoticsIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiagnoticsQueryBuilder();
        $subAna2Shares = $queryBuilder
            ->setQuery($this->diagnotics->query())
            ->setQueryParams($queryParams);
            
        return $this->respond([
            'total' => $subAna2Shares->count(),
            'subAna2Shares' => $subAna2Shares                
                ->select('sub_analysis_2', DB::raw("count(sub_analysis_2) as total"))
                ->groupBy(['sub_analysis_2'])
                ->pluck('total','sub_analysis_2')->all()
        ]);
    }

    /**
     * @param DiagnoticsIndex $request
     *
     * @return JsonResponse
     */
    public function clinicShareBySubAna(DiagnoticsIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiagnoticsQueryBuilder();
        $clinicShares = $queryBuilder
            ->setQuery($this->diagnotics->query())
            ->setQueryParams($queryParams);
        $clinicTypes = $this->clinicType
            ->select(['id', 'name'])
            ->pluck('name','id')->all();
            
        return $this->respond([
            'total' => $clinicShares->count(),
            'clinicShares' => $clinicShares                
                ->select('clinic_type_id', DB::raw("count(clinic_type_id) as total"))
                ->groupBy(['clinic_type_id'])
                ->pluck('total','clinic_type_id')->all(),
            'clinicTypes' => $clinicTypes
        ]);
    }

    /**
     * @param DiagnoticsIndex $request
     *
     * @return JsonResponse
     */
    public function facilityShareBySubAna(DiagnoticsIndex $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $queryBuilder = new DiagnoticsQueryBuilder();
        $facilityShares = $queryBuilder
            ->setQuery($this->diagnotics->query())
            ->setQueryParams($queryParams);
            
        return $this->respond([
            'total' => $facilityShares->count(),
            'facilityShares' => $facilityShares                
                ->select('facility_type', DB::raw("count(facility_type) as total"))
                ->groupBy(['facility_type'])
                ->pluck('total','facility_type')->all()
        ]);
    }
}
