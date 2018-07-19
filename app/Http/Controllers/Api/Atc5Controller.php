<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Atc5;

use Illuminate\Http\JsonResponse;


class Atc5Controller extends ApiController
{
    /**
     * @var Atc5
     */
    private $atc5;

    /**
     * ClinicTypeController constructor.
     *
     * @param Atc5 $atc5
     */
    public function __construct(Atc5 $atc5)
    {
        $this->atc5 = $atc5;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'atc5s' => $this->atc5->get()
        ]);
    }
}
