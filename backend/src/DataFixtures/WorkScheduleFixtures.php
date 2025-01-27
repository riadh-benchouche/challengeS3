<?php

namespace App\DataFixtures;

use App\Entity\WorkSchedule;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class WorkScheduleFixtures extends Fixture implements DependentFixtureInterface
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
        for ($i = 1; $i < 11; $i++) {
            $workSchedule = new WorkSchedule();
            $workSchedule->setWorkDay($faker->numberBetween(1, 5));
            $workSchedule->setMorningStart(9);
            $workSchedule->setMorningEnd(12);
            $workSchedule->setAfternoonStart(13);
            $workSchedule->setAfternoonEnd(17);
            $workSchedule->setEmployee($this->getReference('employee_' . $faker->numberBetween(1, 10)));
            $manager->persist($workSchedule);
        }

        $manager->flush();
    }
}
