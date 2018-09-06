<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\BaseRequest;

class UserStore extends BaseRequest
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
            'email' => 'required|string|unique:users',
            'name' => 'required|string',
            'password' => 'required|string',
            'company_name' => 'required|string',
            'title' => 'required|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'country' => 'required|string',
            'telephone' => 'required|string',
        ];
    }
}
