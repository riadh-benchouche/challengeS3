<?php

namespace App\DataFixtures;

use App\Entity\Employee;
use App\Entity\LeaveDay;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use DateTime;

class LeaveDayFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            EmployeeFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 1; $i < 101; $i++) {
            $employee = $this->getReference('employee_' . $faker->numberBetween(1, 10), Employee::class);

            $leaveDay = new LeaveDay();
            $leaveDay->setDayOff($faker->dateTimeBetween('-1 years', 'now'));
            $leaveDay->setReason($faker->sentence(6, true));
            $leaveDay->setEmployee($employee);
            $manager->persist($leaveDay);
        }

        $manager->flush();
    }
}
