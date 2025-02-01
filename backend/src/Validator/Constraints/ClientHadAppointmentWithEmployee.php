<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class ClientHadAppointmentWithEmployee extends Constraint
{
    public $message = 'You cannot rate this employee because you have not had an appointment with him.';

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
