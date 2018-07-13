<?php

namespace App\Http\Requests\PatientFlowMetrics;

use App\Http\Requests\BaseRequest;

class DiseaseByAcIndex extends BaseRequest
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
            'start_year' => 'nullable|integer',
            'start_quarater' => 'nullable|integer',
            'end_year' => 'nullable|integer',
            'end_quarater' => 'nullable|integer',
            'disease_id' => 'nullable|exists:diseases,id'
        ];
    }
}
