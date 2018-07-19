<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Atc4;

use Illuminate\Http\JsonResponse;


class Atc4Controller extends ApiController
{
    /**
     * @var Atc4
     */
    private $atc4;

    /**
     * ClinicTypeController constructor.
     *
     * @param Atc4 $atc4
     */
    public function __construct(Atc4 $atc4)
    {
        $this->atc4 = $atc4;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'atc4s' => $this->atc4->get()
        ]);
    }
}
