@extends('backpack::layout')

@section('header')
    <section class="content-header">
        <h1>
            Users
        </h1>
        <ol class="breadcrumb">
            <li><a href="{{ url(config('backpack.base.route_prefix', 'admin')) }}">{{ config('backpack.base.project_name') }}</a></li>
            <li class="active">Users</li>
        </ol>
    </section>
@endsection


@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-default">
                <div class="box-header with-border">
                    <div class="box-title">Users ({{ $users->total() }})</div>
                    <a class="btn btn-xs btn-primary pull-right" href="{{ route('users.create') }}">
                        <i class="fa fa-plus-circle"></i> Create new User
                    </a>
                </div>

                <div class="box-body">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($users as $user)
                                <tr>
                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>{{ $user->created_at }}</td>
                                    <td>
                                        <form method="post" action="{{ route('users.destroy', $user->id) }}">
                                            <input type="hidden" name="_method" value="delete" />
                                            {!! csrf_field() !!}
                                            <button type="submit" class="btn btn-xs btn-danger pull-right remove">
                                                <i class="fa fa-trash"></i> Delete
                                            </button>                                            
                                        </form>
                                        <a class="btn btn-xs btn-default pull-right" href="{{ route('users.edit', $user->id) }}">
                                            <i class="fa fa-edit"></i> Edit
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                {{ $users->links() }}
            </div>
        </div>
    </div>
@endsection
