<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Backpack\Base\app\Notifications\ResetPasswordNotification as ResetPasswordNotification;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'last_login_at',
        'last_login_ip',
        'current_login_at',
        'current_login_ip',
        'is_admin',
        'company_name',
        'title',
        'mailing_address',
        'city',
        'state',
        'zip_code',
        'country',
        'telephone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = [
        'current_login_at', 'last_login_at'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $visible = [
        'id',
        'name',
        'email',
        'password',
        'last_login_at',
        'last_login_ip',
        'current_login_at',
        'current_login_ip',
        'is_admin',
        'company_name',
        'title',
        'mailing_address',
        'city',
        'state',
        'zip_code',
        'country',
        'telephone',

        'permissions'
    ];

    /**
     * @param string $value
     *
     * @return string
     */
    public function getCreatedAtAttribute($value)
    {
        return date("m/d/Y H:m", strtotime($value));
    }
    
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    /**
     * The permissions that belong to the user.
     */
    public function permissions()
    {
        return $this->belongsToMany(TherapyArea::class, 'therapy_area_user')
                ->withPivot(
                    'disease_prevalence_ana',
                    'treatment_mapping',
                    'patient_forecasting',
                    'diagnotics'
                );
    }
}
