<?php

namespace App\Http\Requests\DiseasePrevalence;

use App\Http\Requests\BaseRequest;

class DiseaseByCategoryIndex extends BaseRequest
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
            'therapy_area_id' => 'required|exists:therapy_areas,id',
            'start_year' => 'nullable|integer',
            'start_quarater' => 'nullable|integer',
            'end_year' => 'nullable|integer',
            'end_quarater' => 'nullable|integer',
            'clinic_type_id' => 'nullable|exists:clinic_types,id'
        ];
    }
}
