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


#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['appointment:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_USER') and (object == null or (object.getBookedBy() != null and object.getBookedBy().getId() == user.getId())))
            ",
            denormalizationContext: ['groups' => 'appointment:create'],
            normalizationContext: ['groups' => 'appointment:response'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_USER') and object.getBookedBy().getId() == user.getId())
            ",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'appointment:update'],
            normalizationContext: ['groups' => 'appointment:response'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_USER') and object.getBookedBy().getId() == user.getId())
            ",
        )
    ]
)]
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
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:response', 'user:read', 'appointment:create'])]
    private ?int $duration = null;

    #[ORM\Column(length: 255)]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:response', 'appointment:create', 'appointment:update', 'user:read'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[Groups(['appointment:read', 'appointment:response', 'appointment:create'])]
    private ?User $bookedBy = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'appointment:create', 'user:read'])]
    private ?Service $service = null;

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
}
