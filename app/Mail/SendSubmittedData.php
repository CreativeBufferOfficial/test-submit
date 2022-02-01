<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class SendSubmittedData extends Mailable
{
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(protected $submittedData)
    {}

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->markdown('emails.submitted')
            ->with([
                'submittedData' => $this->submittedData
            ]);
    }
}
