<?php

namespace App\Http\Requests\TherapyAreaLevelShare;

use App\Http\Requests\BaseRequest;

class TherapyAreaLevelShareIndex extends BaseRequest
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
            'disease_id' => 'nullable|exists:diseases,id',
            'therapy_area_id' => 'nullable|exists:therapy_areas,id',
            'atc_level' => 'required|integer',
            'start_year' => 'nullable|integer',
            'start_quarater' => 'nullable|integer',
            'end_year' => 'nullable|integer',
            'end_quarater' => 'nullable|integer',
            'clinic_type_id' => 'nullable|exists:clinic_types,id'
        ];
    }
}
