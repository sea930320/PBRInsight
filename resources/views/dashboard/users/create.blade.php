@extends('backpack::layout')

@section('header')
    <section class="content-header">
        <h1>
            Edit
        </h1>
        <ol class="breadcrumb">
            <li><a href="{{ url(config('backpack.base.route_prefix', 'admin')) }}">{{ config('backpack.base.project_name') }}</a></li>
            <li><a href="{{ route('users.index') }}">Users</a></li>
            <li class="active">Create New User</li>
        </ol>
    </section>
@endsection


@section('content')
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <a href="{{ route('users.index') }}"><i class="fa fa-angle-double-left"></i> Back to Users</a>
            <br>
            <br>
            <div class="box box-default">
                <div class="box-header with-border">
                    <div class="box-title">New User</div>
                </div>

                <div class="box-body">
                    <form method="post" action="{{ route('users.store') }}">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label>Name *</label>
                            <input type="text" class="form-control" name="name">
                            @if($errors->has('name'))
                                <span class="text-danger">{{ $errors->first('name') }}</span>
                            @endif
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="text" class="form-control" name="email">
                            @if($errors->has('email'))
                                <span class="text-danger">{{ $errors->first('email') }}</span>
                            @endif
                        </div>
                        <div class="form-group">
                            <label>Change Password</label>
                            <input type="text" class="form-control" name="password">
                            @if($errors->has('password'))
                                <span class="text-danger">{{ $errors->first('password') }}</span>
                            @endif
                        </div>
                        <hr>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-sm btn-primary" id="submitForm">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection