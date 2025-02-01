import React, {useEffect, useState} from 'react';
import axiosInstance from "@/utils/axiosInstance";
import {Employee} from "@/types/employe";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {TrashIcon} from "@heroicons/react/24/outline";
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

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    day: string;
}

const DeleteModal = ({isOpen, onClose, onConfirm, day}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Confirmer la suppression</h3>
                <p className="text-gray-500 mb-6">
                    Êtes-vous sûr de vouloir supprimer les horaires du {day} ?
                    Cette action est irréversible.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function EmployeeScheduleForm({setClose, employee}: {
    setClose: () => void;
    employee?: Employee;
}) {
    const [workHours, setWorkHours] = useState<WorkHours>(initialWorkHours);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; day: string | null }>({
        isOpen: false,
        day: null
    });

    useEffect(() => {
        if (employee?.id) {
            axiosInstance.get(`/api/employees/${employee.id}/work_schedules`)
                .then(response => {
                    const schedules = response.data['hydra:member'];
                    const updatedWorkHours = {...initialWorkHours};

                    schedules.forEach((schedule: WorkSchedule) => {
                        const dayName = DAYS_MAP[schedule.workDay];
                        if (dayName && 'id' in schedule) {
                            updatedWorkHours[dayName] = {
                                works: true,
                                morningStart: schedule.morningStart,
                                morningEnd: schedule.morningEnd,
                                afternoonStart: schedule.afternoonStart,
                                afternoonEnd: schedule.afternoonEnd,
                                id: schedule.id
                            };
                        }
                    });

                    setWorkHours(updatedWorkHours);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des horaires:', error);
                    toast.error('Impossible de récupérer les horaires');
                });
        }
    }, [employee]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const [day, periodTime] = name.split('-');
        setWorkHours((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [periodTime]: value,
            },
        }));
    };

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        const day = name.split('-')[0];

        if (!checked && workHours[day].id) {
            setDeleteDialog({isOpen: true, day});
            return;
        }

        updateDayStatus(day, checked);
    };

    const updateDayStatus = (day: string, works: boolean) => {
        setWorkHours((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                works,
                ...(works ? {} : {
                    morningStart: '',
                    morningEnd: '',
                    afternoonStart: '',
                    afternoonEnd: ''
                })
            },
        }));
    };

    const handleDeleteConfirm = async () => {
        if (!deleteDialog.day) return;

        const day = deleteDialog.day;
        const scheduleId = workHours[day].id;

        if (scheduleId) {
            try {
                await axiosInstance.delete(`/api/work_schedules/${scheduleId}`);
                updateDayStatus(day, false);
                toast.success('Horaire supprimé avec succès');
            } catch (error) {
                console.error(error);
                toast.error('Impossible de supprimer l\'horaire');
            }
        }

        setDeleteDialog({isOpen: false, day: null});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const workSchedules = Object.entries(workHours)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                .map(([_, dayData], index) => {
                    if (!dayData.works) return null;

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

            if (workSchedules.length === 0) {
                toast.error('Veuillez remplir au moins un horaire de travail');
                return;
            }

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
            toast.error('Impossible d\'enregistrer les horaires');
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
                                <div className="space-y-4">
                                    {(Object.keys(workHours) as Array<keyof WorkHours>).map(day => (
                                        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50" key={day}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        name={`${day}-works`}
                                                        checked={workHours[day]?.works || false}
                                                        onChange={handleCheckboxChange}
                                                        className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                                                    />
                                                    <label className="text-sm font-medium text-gray-900">
                                                        {day}
                                                    </label>
                                                </div>
                                                {workHours[day]?.id && (
                                                    <button
                                                        type="button"
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-expect-error
                                                        onClick={() => setDeleteDialog({isOpen: true, day})}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <TrashIcon className="h-4 w-4"/>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-500">Matin</p>
                                                    <div className="flex space-x-2">
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
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-500">Après-midi</p>
                                                    <div className="flex space-x-2">
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

            <DeleteModal
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({isOpen: false, day: null})}
                onConfirm={handleDeleteConfirm}
                day={deleteDialog.day || ''}
            />
        </form>
    );
}