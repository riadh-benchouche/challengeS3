<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

class WorkScheduleDto
{
    #[Assert\NotBlank]
    #[Groups(['work-schedule:create'])]
    public int $workDay;

    #[Assert\NotBlank]
    #[Groups(['work-schedule:create'])]
    public int $morningStart;

    #[Assert\NotBlank]
    #[Groups(['work-schedule:create'])]
    public int $morningEnd;

    #[Assert\NotBlank]
    #[Groups(['work-schedule:create'])]
    public int $afternoonStart;

    #[Assert\NotBlank]
    #[Groups(['work-schedule:create'])]
    public int $afternoonEnd;

    #[Assert\NotBlank]
    #[Groups(['work-schedule:create'])]
    public string $employee;
}