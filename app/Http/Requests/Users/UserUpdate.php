<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\BaseRequest;

class UserUpdate extends BaseRequest
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
            'user_id' => 'required|exists:users,id',
            'email' => 'required|string',
            'name' => 'required|string',
            'company_name' => 'required|string',
            'title' => 'required|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'country' => 'required|string',
            'telephone' => 'required|string',
        ];
    }
}
