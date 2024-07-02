<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Company;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\Mime\Part\File;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Vich\UploaderBundle\Handler\UploadHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Dto\EmailDto;

#[AsController]
final class CreateCompanyController extends AbstractController
{
    private UserPasswordHasherInterface $passwordHasher;
    private MailerInterface $mailer;
    private EntityManagerInterface $entityManager;
    private UploadHandler $uploadHandler;

    public function __construct(UserPasswordHasherInterface $passwordHasher,
        MailerInterface $mailer,
        EntityManagerInterface $entityManager,
        UploadHandler $uploadHandler,
        UrlGeneratorInterface $urlGenerator)
    {
        $this->passwordHasher = $passwordHasher;
        $this->mailer = $mailer;
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
        $this->urlGenerator = $urlGenerator;
    }

    public function __invoke(Request $request): Company
    {
        $name = $request->request->get('name');
        $email = $request->request->get('email');
        $plainPassword = $request->request->get('plainPassword');
        $kbisFile = $request->files->get('kbisFile');

        if (!$name || !$email || !$plainPassword || !$kbisFile) {
            throw new BadRequestHttpException('All fields are required');
        }

        $company = new Company();
        $company->setName($name);
        $company->setEmail($email);
        $company->setPlainPassword($plainPassword);
        $company->setKbisFile($kbisFile);

        $hashedPassword = $this->passwordHasher->hashPassword($company, $plainPassword);
        $company->setPassword($hashedPassword);

        $this->entityManager->persist($company);
        $this->entityManager->flush();

        $this->uploadHandler->upload($company, 'kbisFile');

        $kbisFilePath = $this->getParameter('kernel.project_dir') . '/public/uploads/' . $company->getKbis();

        $this->sendCompanyCreatedEmail($company, $kbisFilePath);

        return $company;
    }

    private function sendCompanyCreatedEmail(Company $company, string $kbisFilePath): void
    {
        $token = $this->generateToken();
        $company->setActivationToken($token);

        $activationUrl = $this->urlGenerator->generate('activate_account', ['id' => $company->getId(), 'token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

        $emailDto = new EmailDto();
        $emailDto->setTo('riad.ahmedyahia@yahoo.fr');
        $emailDto->setSubject('Demande de création de compte');
        $emailDto->setTemplate('company_created');
        $emailDto->setContext([
                'company' => $company,
                'activationUrl' => $activationUrl,
        ]);
        $emailDto->setAttachmentPath($kbisFilePath);
        $emailDto->setAttachmentFileName('kbis.jpg');

        $mailController = new MailController($this->mailer);
        $mailController($emailDto);
    }
    
    private function generateToken(): string
    {
        return bin2hex(random_bytes(32)); // Génération d'un token sécurisé
    }
}
