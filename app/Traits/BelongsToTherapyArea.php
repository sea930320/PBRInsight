<?php
namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Disease;

trait BelongsToTherapyArea
{
    public function getPermission($name = 'disease_prevalence_ana') {
        $user = auth()->user();
        $therapyPermissions = array_column(
            $user->permissions()
                ->where($name, 1)
                ->get()
                ->toArray(),
            'id');
        $diseasePermissions = array_column(
            Disease::whereIn('therapy_area_id', $therapyPermissions)
                ->get()
                ->toArray(),
            'id');
        return [
            'therapy_permissions' => $therapyPermissions,
            'disease_permissions' => $diseasePermissions
        ];
    }
    /**
     * @param bool $excludeDeleted
     *
     * @return Builder
     */
    public function newQuery($excludeDeleted = true) {
        $user = auth()->user();
        $das = $this->getPermission('disease_prevalence_ana');
        $tms = $this->getPermission('treatment_mapping');
        $mas = $this->getPermission('market_ana');
        $dts = $this->getPermission('diagnotics');
        switch ($this->getTable()) {
            case 'disease_prevalences':
                return parent::newQuery($excludeDeleted)
                    ->whereIn($this->getTable() . '.disease_id', $das['disease_permissions']);
                break;
            case 'diseases':
                return parent::newQuery($excludeDeleted)
                    ->whereIn($this->getTable() . '.id', $das['disease_permissions']);
                break;
            case 'therapy_areas':
                return parent::newQuery($excludeDeleted)
                    ->whereIn($this->getTable() . '.id', $das['therapy_permissions']);
                break;
        }
    }
}