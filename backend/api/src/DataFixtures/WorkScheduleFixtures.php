<?php

namespace App\DataFixtures;

use App\Entity\WorkSchedule;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class WorkScheduleFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return [
            EmployeeFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $employee1 = $this->getReference('john-doe');

        $workSchedule1 = new WorkSchedule();
        $workSchedule1->setWorkDay(1);
        $workSchedule1->setMorningStart(9);
        $workSchedule1->setMorningEnd(12);
        $workSchedule1->setAfternoonStart(13);
        $workSchedule1->setAfternoonEnd(17);
        $workSchedule1->setEmployee($employee1);
        $manager->persist($workSchedule1);

        $workSchedule2 = new WorkSchedule();
        $workSchedule2->setWorkDay(2);
        $workSchedule2->setMorningStart(9);
        $workSchedule2->setMorningEnd(12);
        $workSchedule2->setAfternoonStart(13);
        $workSchedule2->setAfternoonEnd(17);
        $workSchedule2->setEmployee($employee1);
        $manager->persist($workSchedule2);

        $workSchedule3 = new WorkSchedule();
        $workSchedule3->setWorkDay(3);
        $workSchedule3->setMorningStart(9);
        $workSchedule3->setMorningEnd(12);
        $workSchedule3->setAfternoonStart(13);
        $workSchedule3->setAfternoonEnd(17);
        $workSchedule3->setEmployee($employee1);
        $manager->persist($workSchedule3);

        $workSchedule4 = new WorkSchedule();
        $workSchedule4->setWorkDay(4);
        $workSchedule4->setMorningStart(9);
        $workSchedule4->setMorningEnd(12);
        $workSchedule4->setAfternoonStart(13);
        $workSchedule4->setAfternoonEnd(17);
        $workSchedule4->setEmployee($employee1);
        $manager->persist($workSchedule4);

        $workSchedule5 = new WorkSchedule();
        $workSchedule5->setWorkDay(5);
        $workSchedule5->setMorningStart(9);
        $workSchedule5->setMorningEnd(12);
        $workSchedule5->setAfternoonStart(13);
        $workSchedule5->setAfternoonEnd(17);
        $workSchedule5->setEmployee($employee1);
        $manager->persist($workSchedule5);

        $manager->flush();
    }
}
