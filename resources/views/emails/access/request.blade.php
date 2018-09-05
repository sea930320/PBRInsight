@component('mail::message')
# Request Access From {{$requestForm["user_info"]["email"]}}

<div class="user-info">
    <div class="row">
        <div class="col-md-3">
            <b>Name:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["first_name"]}} {{$requestForm["user_info"]["last_name"]}}
        </div>
        <div class="col-md-3">
            <b>Email Address:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["email"]}}
        </div>
        <div class="col-md-3">
            <b>Company Name:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["company_name"]}}
        </div>
        <div class="col-md-3">
            <b>Your Title in the Company:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["title"]}}
        </div>
        <div class="col-md-3">
            <b>Mailing Address:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["mailing_address"]}}
        </div>
        <div class="col-md-3">
            <b>City</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["city"]}}
        </div>
        <div class="col-md-3">
            <b>State/Province:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["state"]}}
        </div>
        <div class="col-md-3">
            <b>Zip/Postal Code:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["zip_code"]}}
        </div>
        <div class="col-md-3">
            <b>Country:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["country"]}}
        </div>
        <div class="col-md-3">
            <b>Telephone:</b>
        </div>
        <div class="col-md-9">
            {{$requestForm["user_info"]["telephone"]}}
        </div>
    </div>
</div>

@component('mail::table')
| Therapy Areas | Disease Prevalence Analytics | Treatment Mapping | Patient Forecasting | Diagnostics |
| ------------- |:-------------:| --------:| --------:| --------:|
@foreach ($requestForm["therapy_areas"] as $therapyArea)
| <div class="text-left">{{$therapyArea["name"]}}</div> | @if ($therapyArea["disesePrevalenceAna"]) <input type="checkbox" checked disabled/> @else <input type="checkbox" disabled/> @endif | @if ($therapyArea["treateMapping"]) <input type="checkbox" checked disabled/> @else <input type="checkbox" disabled/> @endif |  @if ($therapyArea["patientForecasting"]) <input type="checkbox" checked disabled/> @else <input type="checkbox" disabled/> @endif | @if ($therapyArea["diagnostics"]) <input type="checkbox" checked disabled/> @else <input type="checkbox" disabled/> @endif |
@endforeach
@endcomponent

@endcomponent
