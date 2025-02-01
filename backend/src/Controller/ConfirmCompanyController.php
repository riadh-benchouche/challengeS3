<?php
namespace App\Controller;

use App\Service\CompanyAccountActivationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Company;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ConfirmCompanyController extends AbstractController
{
    private CompanyAccountActivationService $accountActivationService;

    public function __construct(CompanyAccountActivationService $accountActivationService)
    {
        $this->accountActivationService = $accountActivationService;
    }

    #[Route('/activate/{id}/{token}', name: 'activate_account', methods: ['GET'])]
    public function confirmRegistration(Request $request, CompanyAccountActivationService $accountActivationService): Response
    {
        $token = $request->attributes->get('token');
    
        if (!$token) {
            throw new BadRequestHttpException('Token not provided');
        }
    
        $accountActivationService->activateAccount($token);
    
        return new JsonResponse(['message' => 'Company registration confirmed'], Response::HTTP_OK);
    }
}
