<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['service:read', 'employee:read', 'user:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getEmployee().getId() == user.getId())
            ",
            denormalizationContext: ['groups' => 'service:create'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getEmployee().getId() == user.getId())
            ",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'service:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getEmployee().getId() == user.getId())
            ",
        )
    ]
)]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['service:read', 'employee:read', 'user:read', 'appointment:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'employee:read', 'user:read', 'service:create', 'service:update'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'employee:read', 'user:read', 'service:create', 'service:update'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['service:read', 'employee:read', 'user:read', 'service:create', 'service:update'])]
    private ?int $duration = null;

    #[ORM\Column]
    #[Groups(['employee:read', 'user:read', 'service:update', 'service:create', 'appointment:read'])]
    private ?int $price = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[Groups(['establishment:read', 'employee:read', 'user:read', 'service:create', 'appointment:read'])]
    private ?Employee $employee = null;

    /**
     * @var Collection<int, Appointment>
     */
    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Appointment::class)]
    #[Groups(['establishment:read', 'employee:read', 'appointment:read', 'company:read'])]
    private Collection $appointments;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

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

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setService($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getService() === $this) {
                $appointment->setService(null);
            }
        }

        return $this;
    }

}
