<?php

namespace App\DataFixtures;

use App\Entity\Company;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CompanyFixtures extends Fixture
{
    public const COMPANY_REF = "company";
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Create first company
        $company1 = new Company();
        $company1->setName('Company One');
        $company1->setFoundationDate(2000);
        $company1->setCountries(3);
        $company1->setRaised('1M USD');
        $company1->setEmail('company1@example.com');
        $company1->setPassword($this->passwordHasher->hashPassword($company1, 'password1'));
        $company1->setStatus('ACTIVE');

        // Simulate the KBIS file
        $company1->setKbisFile(new File(__DIR__ . '/../../public/uploads/kbis1-file'));
        $company1->setKbis('kbis1-file');

        $this->addReference(self::COMPANY_REF, $company1);

        $manager->persist($company1);

        // Create second company
        $company2 = new Company();
        $company2->setName('Company Two');
        $company2->setFoundationDate(2010);
        $company2->setCountries(5);
        $company2->setRaised('5M USD');
        $company2->setEmail('company2@example.com');
        $company2->setPassword($this->passwordHasher->hashPassword($company2, 'password2'));
        $company2->setStatus('PENDING');

        // Simulate the KBIS file
        $company2->setKbisFile(new File(__DIR__ . '/../../public/uploads/kbis2-file'));
        $company2->setKbis('kbis2-file');

        $manager->persist($company2);

        // Save all changes
        $manager->flush();

        // Add references for other fixtures if needed
        $this->addReference('company1', $company1);
        $this->addReference('company2', $company2);
    }
}
