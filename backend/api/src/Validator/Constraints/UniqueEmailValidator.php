<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\UserRepository;
use App\Repository\CompanyRepository;
use App\Repository\AdminRepository;

class UniqueEmailValidator extends ConstraintValidator
{
    private $userRepository;
    private $companyRepository;
    private $adminRepository;

    public function __construct(
        UserRepository $userRepository,
        CompanyRepository $companyRepository,
        AdminRepository $adminRepository
    ) {
        $this->userRepository = $userRepository;
        $this->companyRepository = $companyRepository;
        $this->adminRepository = $adminRepository;
    }

    public function validate($email, Constraint $constraint)
    {
        $existingUser = $this->userRepository->findOneBy(['email' => $email]);
        $existingCompany = $this->companyRepository->findOneBy(['email' => $email]);
        $existingAdmin = $this->adminRepository->findOneBy(['email' => $email]);

        if ($existingUser || $existingCompany || $existingAdmin) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
