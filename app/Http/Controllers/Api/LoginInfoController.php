<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Http\JsonResponse;

class LoginInfoController extends ApiController
{
    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = auth()->user();
        return $this->respond([
            'last_login_at' => $user->last_login_at->diffForHumans(),
            'last_login_ip' => $user->last_login_ip,
            'current_login_at' => $user->current_login_at->diffForHumans(),
            'current_login_ip' => $user->current_login_ip
        ]);
    }
}
