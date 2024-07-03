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

class CreateCompanyProcessor implements ProcessorInterface
{
    private UserPasswordHasherInterface $passwordHasher;
    private EntityManagerInterface $entityManager;
    private UploadHandler $uploadHandler;
    private RequestStack $requestStack;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
        UploadHandler $uploadHandler,
        RequestStack $requestStack)
        {
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
        $this->requestStack = $requestStack;
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
        $image = $request->request->get('image');
        $status = $request->request->get('status');
        $kbisFile = $request->files->get('kbisFile');

        if (!$name || !$email || !$plainPassword || !$kbisFile || !$image || !$status) {
            throw new BadRequestHttpException('All fields are required');
        }

        $data->setName($name);
        $data->setEmail($email);
        $data->setImage($image);
        $data->setStatus($status);
        $data->setPlainPassword($plainPassword);

        $hashedPassword = $this->passwordHasher->hashPassword($data, $plainPassword);
        $data->setPassword($hashedPassword);

        if ($kbisFile instanceof UploadedFile) {
            $data->setKbisFile($kbisFile);
            $this->uploadHandler->upload($data, 'kbisFile');
        } else {
            throw new BadRequestHttpException('KBIS file is required');
        }

        $this->entityManager->persist($data);
        $this->entityManager->flush();

        return $data;
    }
}
