<?php

namespace App\Http\Requests\MoleculePrice;

use App\Http\Requests\BaseRequest;

class avgPriceIndex extends BaseRequest
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
            'quarater' => 'nullable|string',
            'atc4_id' => 'nullable|exists:atc4s,id',
            'atc5_id' => 'nullable|exists:atc5s,id'
        ];
    }
}
