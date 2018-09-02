<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Http\JsonResponse;

class PermissionController extends ApiController
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = auth()->user();
        $disease_prevalence_ana = $user->permissions()
            ->where('disease_prevalence_ana', 1)
            ->exists();
        $treatment_mapping = $user->permissions()
            ->where('treatment_mapping', 1)
            ->exists();
        $market_ana = $user->permissions()
            ->where('market_ana', 1)
            ->exists();
        $diagnotics = $user->permissions()
            ->where('diagnotics', 1)
            ->exists();

        return $this->respond([
            'disease_prevalence_ana' => $disease_prevalence_ana,
            'treatment_mapping' => $treatment_mapping,
            'market_ana' => $market_ana,
            'diagnotics' => $diagnotics,
        ]);
    }
}
