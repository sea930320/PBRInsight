<?php

namespace App\Http\Requests\Diagnotics;

use App\Http\Requests\BaseRequest;

class DiagnoticsIndex extends BaseRequest
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
            'classification' => 'nullable|string',
            'sub_analysis_1' => 'nullable|string',
            'sub_analysis_2' => 'nullable|string',
            'start_year' => 'nullable|integer',
            'start_quarater' => 'nullable|integer',
            'end_year' => 'nullable|integer',
            'end_quarater' => 'nullable|integer',
        ];
    }
}
