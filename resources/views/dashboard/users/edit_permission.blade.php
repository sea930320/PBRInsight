@extends('backpack::layout')

@section('header')
    <section class="content-header">
        <h1>
            Grant Access
        </h1>
        <ol class="breadcrumb">
            <li><a href="{{ url(config('backpack.base.route_prefix', 'admin')) }}">{{ config('backpack.base.project_name') }}</a></li>
            <li><a href="{{ route('users.index') }}">Users</a></li>
            <li class="active">Grant Access to {{ $user['name'] }}</li>
        </ol>
    </section>
@endsection


@section('content')
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <a href="{{ route('users.index') }}"><i class="fa fa-angle-double-left"></i> Back to Users</a>
            <br>
            <br>
            <form method="post" action="{{ route('users.permission.save', $user['id']) }}">
                {!! csrf_field() !!}
                <div class="box box-default">
                    <div class="box-header with-border">
                        <div class="box-title">Grant Access to {{ $user['name'] }}</div>
                    </div>                
                    <div class="box-body">                    
                        <table class="table table-bordered table-hover text-center">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Therapy Areas</th>
                                    <th>Disease Prevalence Analytics</th>
                                    <th>Treatment Mapping</th>
                                    <th>Market Analytics</th>
                                    <th>Diagnostics</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($permissions as $permission)
                                <tr>
                                    <td>
                                        <input type="checkbox" class="all-permission" allpermissionid="{{$permission['id']}}" />
                                    </td>
                                    <td>
                                        {{$permission['name']}}
                                    </td>
                                    <td>
                                        @if (isset($permission['pivot']) && isset($permission['pivot']['disease_prevalence_ana']) && $permission['pivot']['disease_prevalence_ana'])
                                            <input type="checkbox" name="disease_prevalence_ana[{{$permission['id']}}]" checked class="permission" permissionid="{{$permission['id']}}" />
                                        @else
                                            <input type="checkbox" name="disease_prevalence_ana[{{$permission['id']}}]" class="permission" permissionid="{{$permission['id']}}" />
                                        @endif
                                    </td>
                                    <td>
                                        @if (isset($permission['pivot']) && isset($permission['pivot']['treatment_mapping']) && $permission['pivot']['treatment_mapping'])
                                            <input type="checkbox" name="treatment_mapping[{{$permission['id']}}]" checked class="permission" permissionid="{{$permission['id']}}" />
                                        @else
                                            <input type="checkbox" name="treatment_mapping[{{$permission['id']}}]" class="permission" permissionid="{{$permission['id']}}" />
                                        @endif
                                    </td>
                                    <td>
                                        @if (isset($permission['pivot']) && isset($permission['pivot']['market_ana']) && $permission['pivot']['market_ana'])
                                            <input type="checkbox" name="market_ana[{{$permission['id']}}]" checked class="permission" permissionid="{{$permission['id']}}" />
                                        @else
                                            <input type="checkbox" name="market_ana[{{$permission['id']}}]" class="permission" permissionid="{{$permission['id']}}" />
                                        @endif
                                    </td>
                                    <td>
                                        @if (isset($permission['pivot']) && isset($permission['pivot']['diagnotics']) && $permission['pivot']['diagnotics'])
                                            <input type="checkbox" name="diagnotics[{{$permission['id']}}]" checked class="permission" permissionid="{{$permission['id']}}" />
                                        @else
                                            <input type="checkbox" name="diagnotics[{{$permission['id']}}]" class="permission" permissionid="{{$permission['id']}}" />
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>                    
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-success">
                            <span class="ladda-label">
                                <i class="fa fa-save"></i> Save 
                            </span>
                        </button>
                        <a href="" class="btn btn-default">
                            <span class="ladda-label">
                                {{ trans('backpack::base.cancel') }}
                            </span>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection

@section('after_styles')
<link rel="stylesheet" href="{{ asset('vendor/adminlte/') }}/plugins/iCheck/minimal/minimal.css">
@endsection
@section('after_scripts')
    <script src="{{ asset('vendor/adminlte') }}/plugins/iCheck/icheck.min.js"></script>
    <script>
        $("input[type='checkbox'].all-permission")
            .iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal'
            })
            .on('ifChecked', function(event) {
                var id = $(this).attr("allpermissionid");
                $("input[permissionid=" + id + "]").iCheck('check');
            })
            .on('ifUnchecked', function(event) {
                var id = $(this).attr("allpermissionid");
                $("input[permissionid=" + id + "]").iCheck('uncheck');
            });
        $("input[type='checkbox'].permission")
            .iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal'
            })
            .on('ifChecked', function(event) {
            })
            .on('ifUnchecked', function(event) {
            });
    </script>
@endsection