<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Establishment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class EstablishmentFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 11; $i++) {
            $company = $this->getReference('company_' . $faker->numberBetween(1, 10));
            $establishment = new Establishment();
            $establishment->setName($faker->company);
            $establishment->setAdress($faker->streetAddress);
            $establishment->setPhone($faker->phoneNumber);
            $establishment->setCity($faker->city);
            $establishment->setZipCode($faker->postcode);
            $establishment->setCountry($faker->country);
            $establishment->setCompany($company);
            $this->addReference('establishment_' . $i, $establishment);
            $manager->persist($establishment);
        }
        $manager->flush();

    }
}
