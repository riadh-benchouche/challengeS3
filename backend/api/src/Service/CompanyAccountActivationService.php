<?php

namespace App\Service;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CompanyAccountActivationService
{
    private CompanyRepository $companyRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(CompanyRepository $companyRepository, EntityManagerInterface $entityManager)
    {
        $this->companyRepository = $companyRepository;
        $this->entityManager = $entityManager;
    }

    public function activateAccount(string $token): void
    {
        $company = $this->companyRepository->findOneBy(['activationToken' => $token]);

        if (!$company) {
            throw new NotFoundHttpException('Company not found or activation token is invalid.');
        }

        $company->setStatus('ACTIVE');
        $company->setActivationToken(null);

        $this->entityManager->flush();
    }
}
