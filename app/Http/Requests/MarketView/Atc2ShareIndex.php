<?php

namespace App\Http\Requests\MarketView;

use App\Http\Requests\BaseRequest;

class Atc2ShareIndex extends BaseRequest
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
            'atc1_id' => 'nullable|exists:atc1s,id',
        ];
    }
}
