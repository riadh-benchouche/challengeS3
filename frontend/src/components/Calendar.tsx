import { useState } from 'react';
import {addDays, startOfWeek, format, isBefore, isEqual, setHours, setMinutes, getDay, isAfter} from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { Employee, Service } from "@/types/employe.ts";

export default function Calendar({ date, setDate, employee, service }: {
    date: Date | null,
    setDate: (date: Date) => void,
    employee: Employee,
    service: Service
}) {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const nextWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    };

    const prevWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, -7));
    };

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
    const now = new Date();
    const serviceDuration = service.duration; // en heures

    const generateSlots = (day: Date, workSchedule: any) => {
        const slots = [];
        const { morningStart, morningEnd, afternoonStart, afternoonEnd } = workSchedule;

        for (let hour = morningStart; hour < morningEnd; hour += serviceDuration) {
            slots.push(setHours(setMinutes(day, 0), hour));
        }

        for (let hour = afternoonStart; hour < afternoonEnd; hour += serviceDuration) {
            slots.push(setHours(setMinutes(day, 0), hour));
        }

        return slots;
    };

    const isSlotDisabled = (slot: Date) => {
        const slotEnd = addDays(slot, serviceDuration / 24);

        return (
            isBefore(slot, now) ||
            employee.appointments.some(appointment => {
                const appointmentDate = new Date(appointment.reservationDate);
                const appointmentStart = setHours(setMinutes(appointmentDate, 0), appointment.beginning);
                const appointmentEnd = addDays(appointmentStart, appointment.duration / 24);

                return (
                    (isEqual(slot, appointmentStart) || isEqual(slotEnd, appointmentEnd)) ||
                    (isBefore(slot, appointmentEnd) && isAfter(slotEnd, appointmentStart))
                );
            })
        );
    };

    const handleSlotClick = (slot: Date) => {
        setDate(slot);
    };

    const isSelectedDate = (slot: Date) => {
        return date && isEqual(slot, date);
    };

    const getWorkScheduleForDay = (day: Date) => {
        const dayOfWeek = getDay(day);
        return employee.workSchedules.find((schedule: any) => schedule.workDay === dayOfWeek);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Calendrier de Réservation</h2>
                <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                    <button
                        type="button"
                        onClick={prevWeek}
                        className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                    >
                        <span className="sr-only">Semaine précédente</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={nextWeek}
                        className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                    >
                        <span className="sr-only">Semaine suivante</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {daysOfWeek.map((day, index) => {
                    const workSchedule = getWorkScheduleForDay(day);
                    if (!workSchedule || day.getDay() === 6 || day.getDay() === 0) { // Griser le samedi et dimanche
                        return (
                            <div key={index} className="border p-4 rounded-lg shadow-lg bg-gray-200">
                                <div className="text-base text-gray-500">
                                    {format(day, 'eeee dd MMMM', { locale: fr })}
                                </div>
                            </div>
                        );
                    }

                    const slots = generateSlots(day, workSchedule);
                    return (
                        <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                            <div className="text-base">
                                {format(day, 'eeee dd MMMM', { locale: fr })}
                            </div>
                            <div className="mt-4 flex flex-col space-y-2">
                                {slots.map((slot, slotIndex) => (
                                    <button
                                        key={slotIndex}
                                        onClick={() => handleSlotClick(slot)}
                                        type="button"
                                        disabled={isSlotDisabled(slot)}
                                        className={`${
                                            isSlotDisabled(slot) ? 'bg-gray-400 cursor-not-allowed' :
                                                isSelectedDate(slot) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                        } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                    >
                                        {format(slot, 'HH:mm')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
