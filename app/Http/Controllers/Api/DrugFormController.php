<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\DrugForm;

use Illuminate\Http\JsonResponse;

class DrugFormController extends ApiController
{
    /**
     * @var DrugForm
     */
    private $drug_form;
    
    /**
     * DrugFormController constructor.
     *
     * @param DrugForm $drug_form
     */
    public function __construct(DrugForm $drug_form)
    {
        $this->drug_form = $drug_form;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return $this->respond([
            'drug_forms' => $this->drug_form
                ->get()
        ]);
    }
}
