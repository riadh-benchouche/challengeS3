<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Uid\Uuid;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AdminFixtures extends Fixture
{
    private $passwordHasher = null;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        $admin = new Admin();
        $admin->setEmail("admin-test@test.com");
        $admin->setPassword($this->passwordHasher->hashPassword($admin, "test"));

        $manager->persist($admin);
        $manager->flush();
    }
}
