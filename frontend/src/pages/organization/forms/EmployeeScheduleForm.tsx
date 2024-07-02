import Input from "@/components/Input.tsx";
import React, {useEffect, useState} from "react";
import Button from "@/components/Button.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";
import {Employee} from "@/types/employe.ts";

export default function EmployeeScheduleForm({setClose, employee}: {
    setClose: () => void
    employee?: Employee
}) {

    const [workHours, setWorkHours] = useState<any>({
        Monday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: ''},
        Tuesday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: ''},
        Wednesday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: ''},
        Thursday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: ''},
        Friday: {works: false, morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: ''},
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const day = name.split('-')[0];
        const periodTime = name.split('-')[1];
        setWorkHours((prev: any) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [`${periodTime}`]: value,
            },
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        const day = name.split('-')[0];
        setWorkHours((prev: any) => ({
            ...prev,
            [day]: {
                ...prev[day],
                works: checked,
            },
        }));
    };

    useEffect(() => {
        if (employee) {
            return
        }
    }, [employee])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const workSchedules = [
            { workDay: '0', ...workHours.Monday, employee: '/api/employees/' + employee?.id },
            { workDay: '1', ...workHours.Tuesday, employee: '/api/employees/' + employee?.id },
            { workDay: '2', ...workHours.Wednesday, employee: '/api/employees/' + employee?.id },
            { workDay: '3', ...workHours.Thursday, employee: '/api/employees/' + employee?.id },
            { workDay: '4', ...workHours.Friday, employee: '/api/employees/' + employee?.id },
        ].filter(day => day.works);

        axiosInstance.post('/api/work_schedules/multiple', {
            workSchedules
        }).then(() => {
            setClose()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  onSubmit={handleSubmit}>
                <div className="h-0 flex-1 overflow-y-auto">
                    <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6 py-8">
                            <div className="flex flex-1 flex-col">
                                <div className="mt-auto">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Horaires de
                                        travail</h3>
                                    <div>
                                        {Object.keys(workHours).map(day => (
                                            <div className="py-1" key={day}>
                                                <label
                                                    className="block text-sm font-medium leading-6 text-gray-900">
                                                    {day}
                                                </label>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <input
                                                        type="checkbox"
                                                        name={`${day}-works`}
                                                        checked={workHours[day]?.works || false}
                                                        onChange={handleCheckboxChange}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    />
                                                    <Input
                                                        type="number"
                                                        name={`${day}-morningStart`}
                                                        disabled={!workHours[day]?.works}
                                                        placeholder="8:00"
                                                        min={8}
                                                        max={9}
                                                        value={workHours[day]?.morningStart || ''}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                    <Input
                                                        type="number"
                                                        name={`${day}-morningEnd`}
                                                        disabled={!workHours[day]?.works}
                                                        placeholder="12:00"
                                                        min={12}
                                                        max={13}
                                                        value={workHours[day]?.morningEnd || ''}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                    <Input
                                                        type="number"
                                                        name={`${day}-afternoonStart`}
                                                        disabled={!workHours[day]?.works}
                                                        placeholder="14:00"
                                                        min={14}
                                                        max={15}
                                                        value={workHours[day]?.afternoonStart || ''}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                    <Input
                                                        type="number"
                                                        name={`${day}-afternoonEnd`}
                                                        disabled={!workHours[day]?.works}
                                                        placeholder="18:00"
                                                        min={18}
                                                        max={19}
                                                        value={workHours[day]?.afternoonEnd || ''}
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-2 mt-8">
                                    <Button
                                        type="submit"
                                        primary={true}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}