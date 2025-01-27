<?php

namespace App\Validator\Constraints;

use App\Repository\AppointmentRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ClientHadAppointmentWithEmployeeValidator extends ConstraintValidator
{
    private $appointmentRepository;

    public function __construct(AppointmentRepository $appointmentRepository)
    {
        $this->appointmentRepository = $appointmentRepository;
    }

    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof ClientHadAppointmentWithEmployee) {
            throw new UnexpectedTypeException($constraint, ClientHadAppointmentWithEmployee::class);
        }

        if (null === $value || '' === $value) {
            return;
        }

        if (!method_exists($value, 'getRatingClient') || !method_exists($value, 'getRatedEmployee')) {
            throw new UnexpectedValueException($value, 'object with getRatingClient and getRatedEmployee methods');
        }

        $client = $value->getRatingClient();
        $employee = $value->getRatedEmployee();

        if ($client === null || $employee === null) {
            return;
        }

        $appointments = $this->appointmentRepository->findAppointmentsByClientAndEmployee($client, $employee);

        if (empty($appointments)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
