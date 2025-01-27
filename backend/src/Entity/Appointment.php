<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\AppointmentRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;   
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_CLIENT') and (object.getBookedBy() != null and object.getBookedBy().getId() == user.getId()))
            ",
        ),
        new GetCollection(),
        new Post(
            normalizationContext: ['groups' => 'appointment:response'],
            denormalizationContext: ['groups' => 'appointment:create'],
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_CLIENT') and (object == null or (object.getBookedBy() != null and object.getBookedBy().getId() == user.getId())))
            ",
        ),
        new Patch(
            inputFormats: [ "json" ],
            normalizationContext: ['groups' => 'appointment:response'],
            denormalizationContext: ['groups' => 'appointment:update'],
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_CLIENT') and object.getBookedBy().getId() == user.getId())
            ",
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_CLIENT') and object.getBookedBy().getId() == user.getId())
            ",
        )
    ],
    normalizationContext: [ 'groups' => ['appointment:read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['bookedBy'=> 'exact'])]
class Appointment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['appointment:read', 'appointment:response', 'user:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:response', 'appointment:create', 'appointment:update', 'user:read'])]
    private ?int $beginning = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:response', 'appointment:create', 'user:read'])]
    private ?int $duration = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:response', 'appointment:update', 'user:read'])]
    private ?string $status = "Booked";

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:response', 'appointment:create', 'appointment:update'])]
    private ?\DateTimeInterface $reservationDate = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[Groups(['appointment:read', 'appointment:response', 'appointment:create'])]
    #[ApiProperty(
        security:"
        is_granted('ROLE_ADMIN')
        or (is_granted('ROLE_CLIENT') and (object == null or (object.getBookedBy() != null and object.getBookedBy().getId() == user.getId())))
        or (is_granted('ROLE_COMPANY') and object.getService().getEmployee().getEstablishment().getCompany().getId() == user.getId())
        ",
        securityPostDenormalize: "
            is_granted('ROLE_ADMIN') 
            or (is_granted('ROLE_CLIENT') and object.getBookedBy().getId() == user.getId())
            or (is_granted('ROLE_COMPANY') and object.getService().getEmployee().getEstablishment().getCompany().getId() == user.getId())
        ",
    )]
    private ?User $bookedBy = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:create', 'user:read'])]
    private ?Service $service = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:create', 'user:read'])]
    private ?Employee $employee = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBeginning(): ?int
    {
        return $this->beginning;
    }

    public function setBeginning(int $beginning): static
    {
        $this->beginning = $beginning;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getReservationDate(): ?\DateTimeInterface
    {
        return $this->reservationDate;
    }

    public function setReservationDate(\DateTimeInterface $reservationDate): static
    {
        $this->reservationDate = $reservationDate;

        return $this;
    }

    public function getBookedBy(): ?User
    {
        return $this->bookedBy;
    }

    public function setBookedBy(?User $bookedBy): static
    {
        $this->bookedBy = $bookedBy;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

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
