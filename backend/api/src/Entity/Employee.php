<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;


#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            denormalizationContext: ['groups' => 'employee:create'],
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getEstablishment().getCompany().getId() == user.getId())
            ",
            validationContext: ['groups' => 'employee:create'],
        ),
        new Patch(
            inputFormats: ["json"],
            denormalizationContext: ['groups' => 'employee:update'],
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getEstablishment().getCompany().getId() == user.getId())
            ",
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')"
        )
    ],
    normalizationContext: ['groups' => ['employee:read', 'appointment:read']],
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'appointment:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['employee:create', 'establishment:read'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'employee:create', 'employee:update'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'employee:create', 'employee:update'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'establishment:read', 'employee:read', 'admin:employee:read', 'employee:create', 'employee:update'])]
    private ?string $category = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[Groups(['employee:read', 'admin:employee:read', 'employee:create'])]
    private ?Establishment $establishment = null;

    /**
     * @var Collection<int, Rating>
     */
    #[ORM\OneToMany(mappedBy: 'ratedEmployee', targetEntity: Rating::class)]
    #[Groups(['employee:read'])]
    private Collection $ratings;

    /**
     * @var Collection<int, Service>
     */
    #[ORM\ManyToMany(targetEntity: Service::class, inversedBy: 'employees')]
    #[Groups(['employee:read', 'service:read'])]
    private Collection $services;

    /**
     * @var Collection<int, WorkSchedule>
     */
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: WorkSchedule::class)]
    #[Groups(['employee:read', 'admin:employee:read', 'establishment:read'])]
    private Collection $workSchedules;

    /**
     * @var Collection<int, LeaveDay>
     */
    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: LeaveDay::class)]
    #[Groups(['employee:read', 'admin:employee:read', 'establishment:read'])]
    private Collection $leaveDays;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['employee:read', 'employee:create', 'employee:update'])]
    #[Assert\Url]
    private ?string $image = null;

    public function __construct()
    {
        $this->ratings = new ArrayCollection();
        $this->services = new ArrayCollection();
        $this->workSchedules = new ArrayCollection();
        $this->leaveDays = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    /**
     * @return Collection<int, Rating>
     */
    public function getRatings(): Collection
    {
        return $this->ratings;
    }

    public function addRating(Rating $rating): static
    {
        if (!$this->ratings->contains($rating)) {
            $this->ratings->add($rating);
            $rating->setRatedEmployee($this);
        }

        return $this;
    }

    public function removeRating(Rating $rating): static
    {
        if ($this->ratings->removeElement($rating)) {
            // set the owning side to null (unless already changed)
            if ($rating->getRatedEmployee() === $this) {
                $rating->setRatedEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setEmployee($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getEmployee() === $this) {
                $service->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, WorkSchedule>
     */
    public function getWorkSchedules(): Collection
    {
        return $this->workSchedules;
    }

    public function addWorkSchedule(WorkSchedule $workSchedule): static
    {
        if (!$this->workSchedules->contains($workSchedule)) {
            $this->workSchedules->add($workSchedule);
            $workSchedule->setEmployee($this);
        }

        return $this;
    }

    public function removeWorkSchedule(WorkSchedule $workSchedule): static
    {
        if ($this->workSchedules->removeElement($workSchedule)) {
            // set the owning side to null (unless already changed)
            if ($workSchedule->getEmployee() === $this) {
                $workSchedule->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, LeaveDay>
     */
    public function getLeaveDays(): Collection
    {
        return $this->leaveDays;
    }

    public function addLeaveDay(LeaveDay $leaveDay): static
    {
        if (!$this->leaveDays->contains($leaveDay)) {
            $this->leaveDays->add($leaveDay);
            $leaveDay->setEmployee($this);
        }

        return $this;
    }

    public function removeLeaveDay(LeaveDay $leaveDay): static
    {
        if ($this->leaveDays->removeElement($leaveDay)) {
            // set the owning side to null (unless already changed)
            if ($leaveDay->getEmployee() === $this) {
                $leaveDay->setEmployee(null);
            }
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }
}
