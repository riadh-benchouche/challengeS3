<?php

namespace App\Processor;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Company;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Vich\UploaderBundle\Handler\UploadHandler;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class CreateCompanyProcessorRegister implements ProcessorInterface
{
    private UserPasswordHasherInterface $passwordHasher;
    private EntityManagerInterface $entityManager;
    private UploadHandler $uploadHandler;
    private RequestStack $requestStack;
    private ParameterBagInterface $parameterBag;
    private MailerInterface $mailer;
    private UrlGeneratorInterface $urlGenerator;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
        UploadHandler $uploadHandler,
        RequestStack $requestStack,
        ParameterBagInterface $parameterBag,
        MailerInterface $mailer,
        UrlGeneratorInterface $urlGenerator
    ) {
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
        $this->requestStack = $requestStack;
        $this->parameterBag = $parameterBag;
        $this->mailer = $mailer;
        $this->urlGenerator = $urlGenerator;
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $request = $this->requestStack->getCurrentRequest();

        if (!$data instanceof Company) {
            throw new \RuntimeException('Expected a Company object.');
        }

        $name = $request->request->get('name');
        $email = $request->request->get('email');
        $plainPassword = $request->request->get('plainPassword');
        $kbisFile = $request->files->get('kbisFile');

        if (!$name || !$email || !$plainPassword || !$kbisFile) {
            throw new BadRequestHttpException('All fields are required');
        }

        $data->setName($name);
        $data->setEmail($email);
        $data->setPlainPassword($plainPassword);

        $hashedPassword = $this->passwordHasher->hashPassword($data, $plainPassword);
        $data->setPassword($hashedPassword);

        if ($kbisFile instanceof UploadedFile) {
            $data->setKbisFile($kbisFile);
            $this->uploadHandler->upload($data, 'kbisFile');
        } else {
            throw new BadRequestHttpException('KBIS file is required');
        }

        $token = $this->generateToken();
        $data->setActivationToken($token);

        $this->entityManager->persist($data);
        $this->entityManager->flush();

        $kbisFilePath = $this->parameterBag->get('kernel.project_dir') . '/public/uploads/' . $data->getKbis();

        $this->sendCompanyCreatedEmail($data, $kbisFilePath);

        return $data;
    }

    private function sendCompanyCreatedEmail(Company $company, string $kbisFilePath): void
    {
        $activationUrl = $this->urlGenerator->generate('activate_account', ['id' => $company->getId(), 'token' => $company->getActivationToken()], UrlGeneratorInterface::ABSOLUTE_URL);

        $email = (new TemplatedEmail())
            ->from('riad.ahmedyahia@yahoo.fr')
            ->to($company->getEmail())
            ->subject('Demande de création d\'une organisation')
            ->htmlTemplate('emails/company_created.html.twig')
            ->context([
                'company' => $company,
                'activationUrl' => $activationUrl,
            ])
            ->attachFromPath($kbisFilePath);

        $this->mailer->send($email);
    }

    private function generateToken(): string
    {
        return bin2hex(random_bytes(32)); // Génération d'un token sécurisé
    }
}
