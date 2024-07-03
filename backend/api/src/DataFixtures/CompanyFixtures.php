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
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 11; $i++) {
            $company = new Company();
            $company->setName($faker->company);
            $company->setEmail($faker->email);
            $company->setPassword($this->passwordHasher->hashPassword($company, 'password'));
            $company->setFoundationDate($faker->dateTimeBetween('-2 years', '-1 year'));
            $company->setDescription($faker->text);
            $company->setRaised($faker->randomFloat(2, 1000, 100000));
            $company->setCountry($faker->country);            
            $company->setKbisFile(new File(__DIR__ . '/../../public/uploads/kbis' . $i . '.jpg'));
            $company->setKbis('kbis' . $i . '-file.jpg');
            $company->setImage($faker->imageUrl(640, 480, 'business', true));
            $manager->persist($company);
            $this->addReference('company_' . $i, $company);
        }
        $manager->flush();
    }
}
