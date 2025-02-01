import {useState} from 'react';
import {
    addDays,
    addHours,
    startOfWeek,
    startOfMonth,
    endOfMonth,
    format,
    isBefore,
    isEqual,
    setHours,
    setMinutes,
    getDay,
    isAfter,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    addMonths,
    isSameDay
} from 'date-fns';
import {fr} from 'date-fns/locale';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarDaysIcon,
    ViewColumnsIcon,
} from '@heroicons/react/16/solid';
import {Employee, Service} from "@/types/employe.ts";

type ViewType = 'month' | 'week' | 'day';

const JS_TO_DB_DAY = {
    0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5,
};

const ViewSelector = ({view, setView}: { view: ViewType, setView: (view: ViewType) => void }) => (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setView('month')
            }}
            type="button"
            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                view === 'month'
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
            }`}
        >
            <CalendarDaysIcon className="h-4 w-4 mr-1"/>
            Mois
        </button>
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setView('week')
            }}
            type="button"
            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                view === 'week'
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
            }`}
        >
            <ViewColumnsIcon className="h-4 w-4 mr-1"/>
            Semaine
        </button>
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setView('day')
            }}
            type="button"
            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                view === 'day'
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
            }`}
        >
            <ViewColumnsIcon className="h-4 w-4 mr-1"/>
            Jour
        </button>
    </div>
);

export default function Calendar({date, setDate, employee, service}: {
    date: Date | null,
    setDate: (date: Date) => void,
    employee: Employee,
    service: Service
}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<ViewType>('week');

    const generateSlots = (day: Date, workSchedule: any) => {
        if (!workSchedule) return [];

        const slots: Date[] = [];
        const {morningStart, morningEnd, afternoonStart, afternoonEnd} = workSchedule;
        const totalDuration = service.duration;

        // Fonction helper pour générer les slots sur une période
        const generateSlotsForPeriod = (startHour: number, endHour: number) => {
            let currentHour = startHour;
            while (currentHour + totalDuration <= endHour) {
                slots.push(setHours(setMinutes(day, 0), currentHour));
                currentHour += totalDuration;
            }
        };

        generateSlotsForPeriod(morningStart, morningEnd);
        generateSlotsForPeriod(afternoonStart, afternoonEnd);

        return slots;
    };

    const getSlotEndTime = (slot: Date) => {
        return addHours(slot, service.duration);
    };

    const isSlotDisabled = (slot: Date) => {
        if (isBefore(slot, new Date())) return true;

        const slotEnd = addDays(slot, service.duration / 24);
        return employee.appointments.some(appointment => {
            const appointmentDate = new Date(appointment.reservationDate);
            const appointmentStart = setHours(setMinutes(appointmentDate, 0), appointment.beginning);
            const appointmentEnd = addDays(appointmentStart, appointment.duration / 24);

            return (
                isEqual(slot, appointmentStart) ||
                isEqual(slotEnd, appointmentEnd) ||
                (isBefore(slot, appointmentEnd) && isAfter(slotEnd, appointmentStart))
            );
        });
    };

    const handleSlotClick = (e: React.MouseEvent<HTMLButtonElement>, slot: Date) => {
        e.preventDefault();
        setDate(slot);
    };

    const getWorkScheduleForDay = (day: Date) => {
        const jsDay = getDay(day);
        const dbDay = JS_TO_DB_DAY[jsDay as keyof typeof JS_TO_DB_DAY];
        return employee.workSchedules.find(
            (schedule: any) => schedule.workDay === dbDay
        );
    };

    const renderTimeSlots = (day: Date) => {
        const workSchedule = getWorkScheduleForDay(day);
        const slots = generateSlots(day, workSchedule);

        if (!workSchedule || [0, 6].includes(getDay(day))) {
            return (
                <div className="text-sm text-gray-500 text-center py-2">
                    Non disponible
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-2">
                {slots.map((slot, slotIndex) => {
                    const disabled = isSlotDisabled(slot);
                    const endTime = getSlotEndTime(slot);

                    return (
                        <button
                            key={slotIndex}
                            onClick={(e) => !disabled && handleSlotClick(e, slot)}
                            disabled={disabled}
                            type="button"
                            className={`
                                px-3 py-2 rounded-md font-medium
                                transition-colors duration-200 text-left
                                ${
                                disabled
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    : isEqual(slot, date)
                                        ? 'bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2'
                                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                            }
                            `}
                        >
                            <div className="text-sm">
                                {format(slot, 'HH:mm')} - {format(endTime, 'HH:mm')}
                            </div>
                            <div className="text-xs opacity-75 mt-0.5">
                                {service.duration}h
                            </div>
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderDayView = () => (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="font-medium text-gray-900">
                    {format(currentDate, 'EEEE d MMMM', {locale: fr})}
                </div>
            </div>
            <div className="p-4">
                {renderTimeSlots(currentDate)}
            </div>
        </div>
    );

    const renderWeekView = () => {
        const weekStart = startOfWeek(currentDate, {weekStartsOn: 1});
        const days = Array.from({length: 7}, (_, i) => addDays(weekStart, i));

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary-100 transition-colors"
                    >
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="font-medium text-gray-900">
                                {format(day, 'EEEE d', {locale: fr})}
                            </div>
                        </div>
                        <div className="p-4">
                            {renderTimeSlots(day)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMonthView = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = endOfMonth(monthEnd);
        const days = eachDayOfInterval({start: startDate, end: endDate});

        return (
            <div>
                <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                        <div
                            key={day}
                            className="bg-gray-50 py-2 text-sm font-medium text-gray-500 text-center"
                        >
                            {day}
                        </div>
                    ))}
                    {days.map((day) => {
                        const workSchedule = getWorkScheduleForDay(day);
                        const slots = generateSlots(day, workSchedule);
                        const hasAvailableSlots = slots.some(slot => !isSlotDisabled(slot));
                        const isSelected = date ? isSameDay(day, date) : false;
                        const isSameMonthDay = isSameMonth(day, currentDate);

                        return (
                            <div
                                key={day.toString()}
                                className={`
                                    min-h-[100px] bg-white p-2 relative
                                    ${!isSameMonthDay ? 'bg-gray-50' : ''}
                                    ${isToday(day) ? 'border-2 border-primary-500' : ''}
                                `}
                            >
                                <div className={`
                                    text-sm font-medium
                                    ${!isSameMonthDay ? 'text-gray-400' : 'text-gray-900'}
                                    ${isSelected ? 'text-primary-600' : ''}
                                `}>
                                    {format(day, 'd')}
                                </div>
                                {isSameMonthDay && hasAvailableSlots && (
                                    <button
                                        onClick={() => {
                                            setCurrentDate(day);
                                            setView('day')
                                        }}
                                        className="mt-1 w-full text-left"
                                    >
                                        <div className="text-xs text-primary-600 font-medium">
                                            {slots.length} créneaux disponibles
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Cliquer pour voir
                                        </div>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const navigate = (direction: 'prev' | 'next') => {
        const amount = direction === 'prev' ? -1 : 1;
        switch (view) {
            case 'month':
                setCurrentDate(addMonths(currentDate, amount));
                break;
            case 'week':
                setCurrentDate(addDays(currentDate, amount * 7));
                break;
            case 'day':
                setCurrentDate(addDays(currentDate, amount));
                break;
        }
    };

    return (
        <div className="mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
                <div>
                    <div className="flex items-center space-x-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {view === 'month' && format(currentDate, 'MMMM yyyy', {locale: fr})}
                            {view === 'week' && `Semaine du ${format(startOfWeek(currentDate, {weekStartsOn: 1}), 'dd MMMM', {locale: fr})}`}
                            {view === 'day' && format(currentDate, 'EEEE d MMMM', {locale: fr})}
                        </h2>
                        <ViewSelector view={view} setView={setView}/>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Durée du service : {service.duration}h
                    </p>
                </div>
                <div className="flex rounded-lg border border-gray-200 divide-x">
                    <button
                        type="button"
                        onClick={() => navigate('prev')}
                        className="p-2 hover:bg-gray-50 transition-colors"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600"/>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('next')}
                        className="p-2 hover:bg-gray-50 transition-colors"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600"/>
                    </button>
                </div>
            </div>

            <div className="p-4">
                {view === 'month' && renderMonthView()}
                {view === 'week' && renderWeekView()}
                {view === 'day' && renderDayView()}
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-end space-x-4 text-sm">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-50 rounded-full border border-primary-200"></div>
                    <span className="ml-2 text-gray-600">Disponible</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="ml-2 text-gray-600">Sélectionné</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-100 rounded-full border border-gray-200"></div>
                    <span className="ml-2 text-gray-600">Indisponible</span>
                </div>
                {view === 'month' && (
                    <div className="flex items-center">
                        <div className="w-3 h-3 border-2 border-primary-500 bg-white rounded-full"></div>
                        <span className="ml-2 text-gray-600">Aujourd'hui</span>
                    </div>
                )}
            </div>
        </div>
    );
}