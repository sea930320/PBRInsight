<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UserStore;
use App\Http\Requests\Users\UserUpdate;
use Prologue\Alerts\Facades\Alert;

use App\Models\User;
use App\Models\TherapyArea;

class UsersController extends Controller
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var TherapyArea
     */
    private $therapyArea;

    /**
     * UsersController constructor.
     *
     * @param User $user
     * @param TherapyArea $therapyArea
     */

    public function __construct(User $user, TherapyArea $therapyArea)
    {
        $this->user = $user;
        $this->therapyArea = $therapyArea;
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

    
    public function compareOrder($a, $b)
    {
        return $a['id'] - $b['id'];
    }

    /**
     * @param int $id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function editPermissions(int $id)
    {
        $user = $this->user
            ->with(['permissions'])
            ->findOrFail($id)
            ->toArray();
        $therapyAreas =$this->therapyArea
            ->get()
            ->toArray();
        $permissions = $user['permissions'];
        foreach ($therapyAreas as $key => $therapyArea) {
            if (!in_array($therapyArea['id'], array_column($user['permissions'], 'id'))) {
                $permissions[] = $therapyArea;
            }
        }

        usort($permissions, [$this, 'compareOrder']);

        return view('dashboard.users.edit_permission', [ 
            'user' => $user,
            'permissions' => $permissions
        ]);
    }

    public function syncPivot($user, $queryParams, $name = 'disease_prevalence_ana') {
        foreach ($queryParams as $key => $queryParam) {
            $user->permissions()->sync([
                $key => [
                    $name => 1
                ]
            ], false);
        }
    }
    /**
     * @param int $id
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function savePermissions(int $id, Request $request)
    {
        $user = $this->user
            ->findOrFail($id);
        $user->permissions()->detach();

        $das = $request->get('disease_prevalence_ana');
        $tms = $request->get('treatment_mapping');
        $pfs = $request->get('patient_forecasting');
        $dgs = $request->get('diagnotics');
        if ($das) {
            $this->syncPivot($user, $das, 'disease_prevalence_ana');
        }
        if ($tms) {
            $this->syncPivot($user, $tms, 'treatment_mapping');
        }        
        if ($pfs) {
            $this->syncPivot($user, $pfs, 'patient_forecasting');
        }        
        if ($dgs) {
            $this->syncPivot($user, $dgs, 'diagnotics');
        }

        Alert::success($user->name . ' has been privileged successfully')->flash();

        return redirect()->route('users.index')->with('alerts', Alert::all());
    }

}
