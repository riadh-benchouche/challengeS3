<?php

namespace App\Entity;

use App\Repository\EstablishmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    normalizationContext: [ 'groups' => ['establishment:read', 'service:read', 'employee:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            securityPostDenormalize: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getCompany().getId() == user.getId() and object.getCompany().getStatus() == 'ACTIVE')",
            denormalizationContext: ['groups' => 'establishment:create'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getCompany().getId() == user.getId())",
            inputFormats: [ "json" ],
            denormalizationContext: ['groups' => 'establishment:update'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_COMPANY') and object.getCompany().getId() == user.getId())",
        )
    ],
)]
class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read', 'employee:read', 'establishment:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'employee:read', 'establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'employee:read', 'establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $adress = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'employee:read', 'establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'employee:read', 'establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $zipCode = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'employee:read', 'establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $country = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'employee:read', 'establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $phone = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:create', 'establishment:read', 'employee:read'])]
    private ?Company $company = null;

    /**
     * @var Collection<int, Employee>
     */
    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Employee::class)]
    #[Groups(['company:read', 'employee:read', 'establishment:read'])]
    private Collection $employees;

    public function __construct()
    {
        $this->employees = new ArrayCollection();
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

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): static
    {
        $this->adress = $adress;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Employee>
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setEstablishment($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getEstablishment() === $this) {
                $employee->setEstablishment(null);
            }
        }

        return $this;
    }
}
