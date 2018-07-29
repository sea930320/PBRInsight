<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UserStore;
use App\Http\Requests\Users\UserUpdate;
use Prologue\Alerts\Facades\Alert;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * @var User
     */
    private $user;

    /**
     * UsersController constructor.
     *
     * @param User $user
     */

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $users = $this->user->paginate(20);
        return view('dashboard.users.index', compact('users'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('dashboard.users.create');
    }
    
    /**
     * @param int $id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(int $id)
    {
        $user = $this->user
            ->findOrFail($id);
        return view('dashboard.users.edit', [ 
            'user' => $user
        ]);
    }

    /**
     * @param UserStore $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(UserStore $request)
    {
        $this->user->create([
            'email' => $request->get('email'),
            'name' => $request->get('name'),
            'password' => bcrypt($request->get('password'))
        ]);

        Alert::success('User successfully created')->flash();

        return redirect()->route('users.index')->with('alerts', Alert::all());
    }

    /**
     * @param UserUpdate $request
     *
     * @return JsonResponse
     */
    public function update(UserUpdate $request)
    {
        $id = $request->get('user_id');
        $queryParams = $request->validatedOnly();
        $user = $this->user
            ->findOrFail($id);
        $user->update([
        	'email' => $request->get('email'),
            'name' => $request->get('name'),
        ]);

        if (isset($queryParams['password'])) {
            $user->update([
                'password' => bcrypt($queryParams['password'])
            ]);
        }

        Alert::success('User successfully updated')->flash();

        return redirect()->route('users.index')->with('alerts', Alert::all());
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->user->findOrFail($id)->delete();

        Alert::success('User successfully deleted')->flash();

        return redirect()->route('users.index')->with('alerts', Alert::all());
    }
}
