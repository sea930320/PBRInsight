<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Atc3;

use Illuminate\Http\JsonResponse;


class Atc3Controller extends ApiController
{
    /**
     * @var Atc3
     */
    private $atc3;

    /**
     * ClinicTypeController constructor.
     *
     * @param Atc3 $atc3
     */
    public function __construct(Atc3 $atc3)
    {
        $this->atc3 = $atc3;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'atc3s' => $this->atc3->get()
        ]);
    }
}
