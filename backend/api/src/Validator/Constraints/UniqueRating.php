<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class UniqueRating extends Constraint
{
    public $message = 'You have already rated this employee.';

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
