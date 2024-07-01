<?php

namespace App\DataFixtures;

use App\Entity\Service;
use App\DataFixtures\EstablishmentFixtures;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ServiceFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return [
            EstablishmentFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 11; $i++) {
            $establishment = $this->getReference('establishment_' . $faker->numberBetween(1, 10));
            $service = new Service();
            $service->setName($faker->word);
            $service->setDescription($faker->sentence(6, true));
            $service->setDuration($faker->numberBetween(15, 120));
            $service->setPrice($faker->randomFloat(2, 10, 100));
            $service->setEstablishment($establishment);
            $this->addReference('service_' . $i, $service);
            $manager->persist($service);

        }

        $manager->flush();
    }
}
