<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Population;

use Illuminate\Http\JsonResponse;

class PopulationController extends ApiController
{
    /**
     * @var Population
     */
    private $population;
    
    /**
     * PopulationController constructor.
     *
     * @param Population $population
     */
    public function __construct(Population $population)
    {
        $this->population = $population;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'populations' => $this->population->get()
        ]);
    }
}
