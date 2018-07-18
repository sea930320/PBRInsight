<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Atc1;

use Illuminate\Http\JsonResponse;


class Atc1Controller extends ApiController
{
    /**
     * @var Atc1
     */
    private $atc1;

    /**
     * ClinicTypeController constructor.
     *
     * @param Atc1 $atc1
     */
    public function __construct(Atc1 $atc1)
    {
        $this->atc1 = $atc1;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'atc1s' => $this->atc1->get()
        ]);
    }
}
