<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RequestAccess\RequestAccessStore;
use App\Mail\RequestAccessMail;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class RequestAccessController extends ApiController
{
    /**
     * @param RequestAccessStore $request
     *
     * @return JsonResponse
     */
    public function store(RequestAccessStore $request): JsonResponse
    {
        $queryParams = $request->validatedOnly();
        $mailing_address = $queryParams["user_info"]["mailing_address"] ?? $queryParams["user_info"]["email"];
        $ram = new RequestAccessMail($queryParams, $mailing_address);
        Mail::to(config('mail.request_to_email'))->send($ram);

        return $this->respond([
            'message' => 'We will grant access to you after review your request access. Thanks!'
        ]);
    }
}
