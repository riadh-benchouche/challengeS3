<?php

namespace App\Repository;

use App\Entity\Appointment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Appointment>
 */
class AppointmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Appointment::class);
    }

    public function findAppointmentsByClientAndEmployee($client, $employee)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.bookedBy = :client')
            ->setParameter('client', $client)
            ->leftJoin('a.service', 's')
            ->leftJoin('s.employee', 'e')
            ->andWhere('e = :employee')
            ->setParameter('employee', $employee)
            ->getQuery()
            ->getResult();
    }
}
