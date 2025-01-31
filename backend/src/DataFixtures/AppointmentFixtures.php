<?php

namespace App\DataFixtures;

use App\Entity\Appointment;
use App\DataFixtures\UserFixtures;
use App\DataFixtures\EmployeeFixtures;
use App\DataFixtures\ServiceFixtures;
use App\Entity\Employee;
use App\Entity\Service;
use App\Entity\User;
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
            EmployeeFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 11; $i++) {
            $user = $this->getReference('user_' . $faker->numberBetween(1, 10), User::class);
            $service = $this->getReference('service_' . $faker->numberBetween(1, 10), Service::class);
            $employee = $this->getReference('employee_' . $faker->numberBetween(1, 10), Employee::class);
            $appointment = new Appointment();
            $appointment->setBeginning($faker->randomElement(['9', '13']));
            $appointment->setDuration($faker->numberBetween(1, 4));
            $appointment->setStatus($faker->randomElement(['Booked', 'Confirmed', 'Cancelled']));
            $appointment->setReservationDate($faker->dateTimeBetween('-1 month', '+1 month'));
            $appointment->setBookedBy($user);
            $appointment->setService($service);
            $appointment->setEmployee($employee);
            $manager->persist($appointment);
        }

        $manager->flush();
    }
}
