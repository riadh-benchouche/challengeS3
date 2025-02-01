<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class WorkScheduleMultipleDto
{
    #[Assert\Valid]
    #[Assert\NotBlank]
    public array $workSchedules = [];

    public function __construct(array $workSchedules = [])
    {
        $this->workSchedules = $workSchedules;
    }
}
