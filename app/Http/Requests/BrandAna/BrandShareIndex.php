<?php

namespace App\Http\Requests\BrandAna;

use App\Http\Requests\BaseRequest;

class BrandShareIndex extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'year' => 'nullable|string',
            'drug_form_id' => 'nullable|exists:drug_forms,id',
            'atc4_id' => 'nullable|exists:atc4s,id',
            'atc5_id' => 'nullable|exists:atc5s,id',
        ];
    }
}
