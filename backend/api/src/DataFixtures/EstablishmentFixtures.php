<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Establishment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class EstablishmentFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return [
            CompanyFixtures::class,
        ];
    }

    public function load(ObjectManager $manager): void
    {
        $company = $this->getReference('company1');

        $establishment1 = new Establishment();
        $establishment1->setName("Etablissement 1");
        $establishment1->setAdress("6 avenue Daniel Lesueur");
        $establishment1->setCity("Paris");
        $establishment1->setZipCode("75007");
        $establishment1->setCountry("France");
        $establishment1->setPhone("0123456789");
        $establishment1->setCompany($company);
        $this->addReference("establishment-1", $establishment1);
        $manager->persist($establishment1);

        $establishment2 = new Establishment();
        $establishment2->setName("Etablissement 2");
        $establishment2->setAdress("29 rue du Louvre");
        $establishment2->setCity("Paris");
        $establishment2->setZipCode("75002");
        $establishment2->setCountry("France");
        $establishment2->setPhone("0123456790");
        $establishment2->setCompany($company);
        $this->addReference("establishment-2", $establishment2);
        $manager->persist($establishment2);

        $establishment3 = new Establishment();
        $establishment3->setName("Etablissement 3");
        $establishment3->setAdress("200 rue du Faubourg Saint-Antoine");
        $establishment3->setCity("Paris");
        $establishment3->setZipCode("75012");
        $establishment3->setCountry("France");
        $establishment3->setPhone("0123456791");
        $establishment3->setCompany($company);
        $this->addReference("establishment-3", $establishment3);
        $manager->persist($establishment3);

        $establishment4 = new Establishment();
        $establishment4->setName("Etablissement 4");
        $establishment4->setAdress("211 rue du Faubourg Saint-Antoine");
        $establishment4->setCity("Paris");
        $establishment4->setZipCode("75012");
        $establishment4->setCountry("France");
        $establishment4->setPhone("0123456792");
        $establishment4->setCompany($company);
        $this->addReference("establishment-4", $establishment4);
        $manager->persist($establishment4);

        $manager->flush();
    }
}
