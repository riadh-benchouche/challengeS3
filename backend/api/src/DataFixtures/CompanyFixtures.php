<?php

namespace App\DataFixtures;

use App\Entity\Company;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CompanyFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $company1 = new Company();
        $company1->setName('Company One');
        $company1->setFoundationDate('2024-30-06'); 
        $company1->setCountry("Spain");
        $company1->setRaised('1M USD');
        $company1->setEmail('company1@example.com');
        $company1->setPassword($this->passwordHasher->hashPassword($company1, 'password1'));
        $company1->setStatus('ACTIVE');

        $company1->setKbisFile(new File(__DIR__ . '/../../public/uploads/kbis1.jpg'));
        $company1->setKbis('kbis1-file');

        $manager->persist($company1);

        $company2 = new Company();
        $company2->setName('Company Two');
        $company2->setFoundationDate('2024-20-06'); 
        $company2->setCountry("France");
        $company2->setRaised('5M USD');
        $company2->setEmail('company2@example.com');
        $company2->setPassword($this->passwordHasher->hashPassword($company2, 'password2'));
        $company2->setStatus('PENDING');

        $company2->setKbisFile(new File(__DIR__ . '/../../public/uploads/kbis2.jpg'));
        $company2->setKbis('kbis2-file');

        $manager->persist($company2);

        $manager->flush();

        $this->addReference('company1', $company1);
        $this->addReference('company2', $company2);
    }
}
