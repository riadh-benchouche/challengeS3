<?php

namespace App\DataFixtures;

use App\Entity\LeaveDay;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use DateTime;

class LeaveDayFixtures extends Fixture implements DependentFixtureInterface
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

        $leaveDay1 = new LeaveDay();
        $leaveDay1->setDayOff(new DateTime('2024-07-01'));
        $leaveDay1->setReason('Annual leave');
        $leaveDay1->setEmployee($employee1);
        $manager->persist($leaveDay1);

        $leaveDay2 = new LeaveDay();
        $leaveDay2->setDayOff(new DateTime('2024-07-02'));
        $leaveDay2->setReason('Medical leave');
        $leaveDay2->setEmployee($employee1);
        $manager->persist($leaveDay2);

        $manager->flush();
    }
}
