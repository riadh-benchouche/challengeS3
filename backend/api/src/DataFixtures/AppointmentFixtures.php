<?php

namespace App\DataFixtures;

use App\Entity\Appointment;
use App\Entity\User;
use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AppointmentFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            ServiceFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create();
        $user1 = $this->getReference('user1@example.com');
        $user2 = $this->getReference('user2@example.com');
        $webDevelopmentService = $this->getReference('web-development');
        $graphicDesignService = $this->getReference('graphic-design');

        for ($i = 0; $i < 10; $i++) {
            $appointment = new Appointment();
            $appointment->setBeginning($faker->randomElement(['9', '13']));
            $appointment->setDuration($faker->numberBetween(1, 4));
            $appointment->setStatus($faker->randomElement(['Booked', 'Confirmed', 'Cancelled']));
            $appointment->setReservationDate($faker->dateTimeBetween('-1 month', '+1 month'));
            $appointment->setBookedBy($faker->randomElement([$user1, $user2]));
            $appointment->setService($faker->randomElement([$webDevelopmentService, $graphicDesignService]));
            $manager->persist($appointment);
        }

        $manager->flush();
    }
}
