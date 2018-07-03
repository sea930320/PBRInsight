<?php

namespace App\Http\Requests\PatientFlowMetrics;

use App\Http\Requests\BaseRequest;

class DiseaseByAtcIndex extends BaseRequest
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
            'atc_level' => 'required|integer',
            'start_year' => 'nullable|integer',
            'start_quarater' => 'nullable|integer',
            'end_year' => 'nullable|integer',
            'end_quarater' => 'nullable|integer',
            'clinic_type_id' => 'nullable|exists:clinic_types,id'
        ];
    }
}
