<?php

namespace App\Http\Requests\RequestAccess;

use App\Http\Requests\BaseRequest;

class RequestAccessStore extends BaseRequest
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
            'user_info.city' => 'nullable|string',
            'user_info.company_name' => 'required|string',
            'user_info.country' => 'required|string',
            'user_info.email' => 'required|string',
            'user_info.first_name' => 'required|string',
            'user_info.last_name' => 'required|string',
            'user_info.mailing_address' => 'nullable|string',
            'user_info.state' => 'nullable|string',
            'user_info.telephone' => 'required|string',
            'user_info.title' => 'required|string',
            'user_info.zip_code' => 'required|string',
            'therapy_areas' => 'required'
        ];
    }
}
