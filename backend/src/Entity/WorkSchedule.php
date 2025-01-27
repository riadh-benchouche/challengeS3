<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\WorkScheduleRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Processor\WorkScheduleMultipleProcessor;
use App\Dto\WorkScheduleMultipleDto;

#[ORM\Entity(repositoryClass: WorkScheduleRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            uriTemplate: '/work_schedules/multiple',
            input: WorkScheduleMultipleDto::class,
            processor: WorkScheduleMultipleProcessor::class,
            openapi: new \ApiPlatform\OpenApi\Model\Operation(
                summary: 'Create multiple work schedules',
                description: 'Create multiple work schedules in one request.'
            ),
            securityPostDenormalize: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_COMPANY'))",
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_COMPANY') and object.getEmployee().getEstablishment().getCompany().getId() == user.getId())
            ",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'work-schedule:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getEmployee().getEstablishment().getCompany().getId() == user.getId())
            ",
        )
    ]
)]
class WorkSchedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['work-schedule:create', 'work-schedule:update', 'establishment:read', 'employee:read'])]
    private ?int $workDay = null;

    #[ORM\Column]
    #[Groups(['work-schedule:create', 'work-schedule:update', 'establishment:read', 'employee:read'])]
    private ?int $morningStart = null;

    #[ORM\Column]
    #[Groups(['work-schedule:create', 'work-schedule:update', 'establishment:read', 'employee:read'])]
    private ?int $morningEnd = null;

    #[ORM\Column]
    #[Groups(['work-schedule:create', 'work-schedule:update', 'establishment:read', 'employee:read'])]
    private ?int $afternoonStart = null;

    #[ORM\Column]
    #[Groups(['work-schedule:create', 'work-schedule:update', 'establishment:read', 'employee:read'])]
    private ?int $afternoonEnd = null;

    #[ORM\ManyToOne(inversedBy: 'workSchedules')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['work-schedule:create', 'establishment:read', 'employee:read' ])]
    private ?Employee $employee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWorkDay(): ?int
    {
        return $this->workDay;
    }

    public function setWorkDay(int $workDay): static
    {
        $this->workDay = $workDay;

        return $this;
    }

    public function getMorningStart(): ?int
    {
        return $this->morningStart;
    }

    public function setMorningStart(int $morningStart): static
    {
        $this->morningStart = $morningStart;

        return $this;
    }

    public function getMorningEnd(): ?int
    {
        return $this->morningEnd;
    }

    public function setMorningEnd(int $morningEnd): static
    {
        $this->morningEnd = $morningEnd;

        return $this;
    }

    public function getAfternoonStart(): ?int
    {
        return $this->afternoonStart;
    }

    public function setAfternoonStart(int $afternoonStart): static
    {
        $this->afternoonStart = $afternoonStart;

        return $this;
    }

    public function getAfternoonEnd(): ?int
    {
        return $this->afternoonEnd;
    }

    public function setAfternoonEnd(int $afternoonEnd): static
    {
        $this->afternoonEnd = $afternoonEnd;

        return $this;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

        return $this;
    }
}
