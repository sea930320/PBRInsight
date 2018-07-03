<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\AgeGroupReport;

use Illuminate\Http\JsonResponse;

class AgeGroupReportController extends ApiController
{
    /**
     * @var AgeGroupReport
     */
    private $ageGroupReport;
    
    /**
     * AgeGroupReportController constructor.
     *
     * @param AgeGroupReport $ageGroupReport
     */
    public function __construct(AgeGroupReport $ageGroupReport)
    {
        $this->ageGroupReport = $ageGroupReport;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'ageGroupReports' => $this->ageGroupReport->with(['age_group'])->get()
        ]);
    }
}
