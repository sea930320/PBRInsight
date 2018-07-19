<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Atc2;

use Illuminate\Http\JsonResponse;


class Atc2Controller extends ApiController
{
    /**
     * @var Atc2
     */
    private $atc2;

    /**
     * ClinicTypeController constructor.
     *
     * @param Atc2 $atc2
     */
    public function __construct(Atc2 $atc2)
    {
        $this->atc2 = $atc2;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'atc2s' => $this->atc2->get()
        ]);
    }
}
