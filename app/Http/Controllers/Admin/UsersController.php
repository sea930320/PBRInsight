<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UserStore;
use App\Http\Requests\Users\UserUpdate;
use Prologue\Alerts\Facades\Alert;

use App\Models\User;
use App\Models\TherapyArea;
use App\Models\MktPermission;

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
     * @var MktPermission
     */
    private $mktPermission;

    /**
     * UsersController constructor.
     *
     * @param User $user
     * @param TherapyArea $therapyArea
     * @param MktPermission $mktPermission
     */

    public function __construct(User $user, TherapyArea $therapyArea, MktPermission $mktPermission)
    {
        $this->user = $user;
        $this->therapyArea = $therapyArea;
        $this->mktPermission = $mktPermission;
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
            'password' => bcrypt($request->get('password')),
            'company_name' => $request->get('company_name'),
            'title' => $request->get('title'),
            'city' => $request->get('city') ?? '',
            'state' => $request->get('state') ?? '',
            'country' => $request->get('country'),
            'telephone' => $request->get('telephone'),
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
            'company_name' => $request->get('company_name'),
            'title' => $request->get('title'),
            'city' => $request->get('city'),
            'state' => $request->get('state'),
            'country' => $request->get('country'),
            'telephone' => $request->get('telephone'),
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
            ->with(['permissions', 'permission_for_mkt'])
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
            'permissions' => $permissions,
            'mkt_permission' => $user['permission_for_mkt']
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
        $user->permission_for_mkt()->delete();

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

        // save to mkt_permissions
        $mktPermission = $request->get('mkt_permission');
        if (isset($mktPermission)) {
            $this->mktPermission->create([
                'user_id' => $id,
                'total_market_view' => isset($mktPermission['total_market_view']) ? 1:0,
                'therapy_area_ana' => isset($mktPermission['therapy_area_ana']) ? 1:0,
                'brand_ana' => isset($mktPermission['brand_ana']) ? 1:0,
                'molecule_ana' => isset($mktPermission['molecule_ana']) ? 1:0,
            ]);
        }        

        Alert::success($user->name . ' has been privileged successfully')->flash();

        return redirect()->route('users.index')->with('alerts', Alert::all());
    }

}
