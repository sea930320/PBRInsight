<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RequestAccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public $requestForm;
    const VIEW = 'emails.access.request';
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($requestForm, $email)
    {
        $this->requestForm = $requestForm;
        // $this->from = [
        //     [
        //         'address' => $email,
        //         'name' => $requestForm["user_info"]["first_name"]. " ". $requestForm["user_info"]["last_name"]
        //     ]
        // ];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown(static::VIEW);
    }
}
