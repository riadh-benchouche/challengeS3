<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class UniqueEmail extends Constraint
{
    public $message = 'This email address is already in use.';
}
