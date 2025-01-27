<?php

namespace App\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\WorkScheduleMultipleDto;
use App\Entity\WorkSchedule;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class WorkScheduleMultipleProcessor implements ProcessorInterface
{
    private EntityManagerInterface $entityManager;
    private EmployeeRepository $employeeRepository;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, EmployeeRepository $employeeRepository, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->employeeRepository = $employeeRepository;
        $this->security = $security;
    }

    private function getCompanyOfCurrentUser(): ?Company
    {
        $user = $this->security->getUser();
        if (!$user instanceof Company) {
            throw new \LogicException('User is not authenticated.');
        }

        return $user->getId();
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (!$data instanceof WorkScheduleMultipleDto) {
            throw new \InvalidArgumentException('Expected instance of ' . WorkScheduleMultipleDto::class);
        }

        // $userCompany = $this->getCompanyOfCurrentUser();

        // $employee = $data->workSchedules->pluck('employee');

        // if (count($employee) !== count(array_unique($employee))) {
        //     throw new \InvalidArgumentException('Employee is required');
        // }

        foreach ($data->workSchedules as $workScheduleDto) {
            $employeeId = (int) str_replace('/api/employees/', '', $workScheduleDto["employee"]);

            $employee = $this->employeeRepository->find($employeeId);
            // if ($employee->getEstablishment()->getCompany() !== $userCompany) {
            //     throw new \Exception('You do not have permission to create schedules for this employee.');
            // }
            
            $workSchedule = new WorkSchedule();
            $workSchedule->setWorkDay($workScheduleDto["workDay"]);
            $workSchedule->setMorningStart($workScheduleDto["morningStart"]);
            $workSchedule->setMorningEnd($workScheduleDto["morningEnd"]);
            $workSchedule->setAfternoonStart($workScheduleDto["afternoonStart"]);
            $workSchedule->setAfternoonEnd($workScheduleDto["afternoonEnd"]);
            $workSchedule->setEmployee($employee);

            $this->entityManager->persist($workSchedule);
        }

        $this->entityManager->flush();
    }
}
