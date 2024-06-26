<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LeaveDayRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\ApiProperty;


#[ORM\Entity(repositoryClass: LeaveDayRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getEmployee().getEstablishment().getCompany().getId() == user.getId())
            ",
            denormalizationContext: ['groups' => 'leave-day:create'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_COMPANY') and object.getEmployee().getEstablishment().getCompany().getId() == user.getId())
            ",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'leave-day:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getEmployee().getEstablishment().getCompany().getId() == user.getId())
            ",
        )
    ]
)]
class LeaveDay
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['employee:read', 'establishment:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['leave-day:create', 'leave-day:update', 'employee:read', 'establishment:read'])]
    private ?\DateTimeInterface $dayOff = null;

    #[ORM\Column(length: 255)]
    #[Groups(['leave-day:create', 'leave-day:update', 'employee:read', 'establishment:read'])]
    private ?string $reason = null;

    #[ORM\ManyToOne(inversedBy: 'leaveDays')]
    #[Groups(['leave-day:create'])]
    private ?Employee $employee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayOff(): ?\DateTimeInterface
    {
        return $this->dayOff;
    }

    public function setDayOff(\DateTimeInterface $dayOff): static
    {
        $this->dayOff = $dayOff;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(string $reason): static
    {
        $this->reason = $reason;

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
