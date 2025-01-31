import Input from "@/components/Input.tsx";
import React, {useEffect, useState} from "react";
import Button from "@/components/Button.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";
import {Employee} from "@/types/employe.ts";
import {toast} from "react-toastify";

interface DaySchedule {
    works: boolean;
    morningStart: string | number;
    morningEnd: string | number;
    afternoonStart: string | number;
    afternoonEnd: string | number;
    id: number | null;
}

interface WorkHours {
    [key: string]: DaySchedule;
}

interface BaseWorkSchedule {
    workDay: number;
    morningStart: number;
    morningEnd: number;
    afternoonStart: number;
    afternoonEnd: number;
    employee: string;
}

interface NewWorkSchedule extends BaseWorkSchedule {
}

interface ExistingWorkSchedule extends BaseWorkSchedule {
    id: number;
}

type WorkSchedule = NewWorkSchedule | ExistingWorkSchedule;

const DAYS_MAP: { [key: string]: string } = {
    '0': 'Monday',
    '1': 'Tuesday',
    '2': 'Wednesday',
    '3': 'Thursday',
    '4': 'Friday'
};

const initialWorkHours: WorkHours = {
    Monday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', id: null},
    Tuesday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', id: null},
    Wednesday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', id: null},
    Thursday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', id: null},
    Friday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', id: null},
};

export default function EmployeeScheduleForm({setClose, employee}: {
    setClose: () => void
    employee?: Employee
}) {
    const [workHours, setWorkHours] = useState<WorkHours>(initialWorkHours);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (employee?.id) {
            axiosInstance.get(`/api/employees/${employee.id}/work_schedules`)
                .then(response => {
                    const schedules = response.data['hydra:member'];
                    const updatedWorkHours = {...initialWorkHours};

                    schedules.forEach((schedule: WorkSchedule) => {
                        const dayName = DAYS_MAP[schedule.workDay];
                        if (dayName) {
                            if ("id" in schedule) {
                                updatedWorkHours[dayName] = {
                                    works: true,
                                    morningStart: schedule.morningStart,
                                    morningEnd: schedule.morningEnd,
                                    afternoonStart: schedule.afternoonStart,
                                    afternoonEnd: schedule.afternoonEnd,
                                    id: schedule?.id || null
                                };
                            }
                        }
                    });

                    setWorkHours(updatedWorkHours);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des horaires:', error);
                    toast.error('Erreur lors de la récupération des horaires');
                });
        }
    }, [employee]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const [day, periodTime] = name.split('-');
        setWorkHours((prev: WorkHours) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [periodTime]: value,
            },
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        const day = name.split('-')[0];
        setWorkHours((prev: WorkHours) => ({
            ...prev,
            [day]: {
                ...prev[day],
                works: checked,
            },
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const workSchedules = Object.entries(workHours)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .map(([_, dayData], index) => {
                    if (!dayData.works) return null;

                    // Validation des champs requis
                    if (!dayData.morningStart || !dayData.morningEnd ||
                        !dayData.afternoonStart || !dayData.afternoonEnd) {
                        return null;
                    }

                    const baseSchedule: BaseWorkSchedule = {
                        workDay: index,
                        morningStart: parseInt(dayData.morningStart.toString()),
                        morningEnd: parseInt(dayData.morningEnd.toString()),
                        afternoonStart: parseInt(dayData.afternoonStart.toString()),
                        afternoonEnd: parseInt(dayData.afternoonEnd.toString()),
                        employee: `/api/employees/${employee?.id}`
                    };

                    if (dayData.id) {
                        // Pour les mises à jour
                        return {
                            ...baseSchedule,
                            id: dayData.id
                        } as ExistingWorkSchedule;
                    }

                    return baseSchedule as NewWorkSchedule;
                })
                .filter((schedule): schedule is WorkSchedule =>
                    schedule !== null &&
                    Object.values(schedule).every(value => value !== undefined && value !== '')
                );

            // Si aucun horaire valide n'est trouvé, ne pas envoyer la requête
            if (workSchedules.length === 0) {
                toast.error('Veuillez remplir au moins un horaire de travail');
                return;
            }

            // Gestion des mises à jour et des nouvelles entrées
            const updates = workSchedules.filter((schedule): schedule is ExistingWorkSchedule => 'id' in schedule);
            const newEntries = workSchedules.filter((schedule): schedule is NewWorkSchedule => !('id' in schedule));

            let success = true;

            if (updates.length > 0) {
                try {
                    await Promise.all(updates.map(schedule => {
                        const {id, ...updateData} = schedule;
                        return axiosInstance.patch(`/api/work_schedules/${id}`, updateData);
                    }));
                } catch (error) {
                    success = false;
                    throw error;
                }
            }

            if (newEntries.length > 0) {
                try {
                    await axiosInstance.post('/api/work_schedules/multiple', {
                        workSchedules: newEntries
                    });
                } catch (error) {
                    success = false;
                    throw error;
                }
            }

            if (success) {
                toast.success('Horaires enregistrés avec succès');
                setClose();
            }
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement des horaires:', error);
            toast.error('Erreur lors de l\'enregistrement des horaires');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
              onSubmit={handleSubmit}>
            <div className="h-0 flex-1 overflow-y-auto">
                <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6 py-8">
                        <div className="flex flex-1 flex-col">
                            <div className="mt-auto">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    {Object.values(workHours).some(h => h.id !== null)
                                        ? 'Modifier les horaires'
                                        : 'Ajouter les horaires'}
                                </h3>
                                <div>
                                    {(Object.keys(workHours) as Array<keyof WorkHours>).map(day => (
                                        <div className="py-1" key={day}>
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                {day}
                                            </label>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <input
                                                    type="checkbox"
                                                    name={`${day}-works`}
                                                    checked={workHours[day]?.works || false}
                                                    onChange={handleCheckboxChange}
                                                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                                                />
                                                <Input
                                                    type="number"
                                                    name={`${day}-morningStart`}
                                                    disabled={!workHours[day]?.works}
                                                    placeholder="8:00"
                                                    min={8}
                                                    max={9}
                                                    value={workHours[day]?.morningStart || ''}
                                                    onChange={handleInputChange}
                                                />
                                                <Input
                                                    type="number"
                                                    name={`${day}-morningEnd`}
                                                    disabled={!workHours[day]?.works}
                                                    placeholder="12:00"
                                                    min={12}
                                                    max={13}
                                                    value={workHours[day]?.morningEnd || ''}
                                                    onChange={handleInputChange}
                                                />
                                                <Input
                                                    type="number"
                                                    name={`${day}-afternoonStart`}
                                                    disabled={!workHours[day]?.works}
                                                    placeholder="14:00"
                                                    min={14}
                                                    max={15}
                                                    value={workHours[day]?.afternoonStart || ''}
                                                    onChange={handleInputChange}
                                                />
                                                <Input
                                                    type="number"
                                                    name={`${day}-afternoonEnd`}
                                                    disabled={!workHours[day]?.works}
                                                    placeholder="18:00"
                                                    min={18}
                                                    max={19}
                                                    value={workHours[day]?.afternoonEnd || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-8">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    primary={true}
                                >
                                    {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}