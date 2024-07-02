<?php
namespace App\Controller;

use App\Service\CompanyAccountActivationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Company;

class ConfirmCompanyController extends AbstractController
{
    private CompanyAccountActivationService $accountActivationService;

    public function __construct(CompanyAccountActivationService $accountActivationService)
    {
        $this->accountActivationService = $accountActivationService;
    }

    #[Route('/companies/{id}/activate', name: 'activate_account', methods: ['GET'])]
    public function confirmRegistration(Company $company): Response
    {
        $this->accountActivationService->activateAccount($company->getActivationToken());

        return new JsonResponse(['message' => 'Company registration confirmed'], Response::HTTP_OK);
    }
}
