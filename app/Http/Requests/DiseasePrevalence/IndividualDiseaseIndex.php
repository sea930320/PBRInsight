<?php

namespace App\Http\Requests\DiseasePrevalence;

use App\Http\Requests\BaseRequest;

class IndividualDiseaseIndex extends BaseRequest
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
            'period' => 'nullable|string',
            'start_period' => 'nullable|string',
            'end_period' => 'nullable|string',
            'clinic_type_id' => 'nullable|exists:clinic_types,id'
        ];
    }
}
