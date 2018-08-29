<?php

namespace App\Listeners;

use App\Events\JwtLogin;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Carbon\Carbon;

class UserLoginListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Handle the event.
     *
     * @param  JwtLogin  $event
     * @return void
     */
    public function handle(JwtLogin $event)
    {
        $user = $event->user;
        $user->last_login_at = $user->current_login_at ? $user->current_login_at : Carbon::now();
        $user->last_login_ip = $user->current_login_ip ? $user->current_login_ip : $this->request->ip();
        $user->current_login_at = Carbon::now();
        $user->current_login_ip = $this->request->ip();
        $user->save();
    }
}
