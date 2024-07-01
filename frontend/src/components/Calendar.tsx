import {useState} from 'react';
import {addDays, startOfWeek, format, isBefore} from 'date-fns';
import {fr} from 'date-fns/locale';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/16/solid';

export default function Calendar({date, setDate}: { date: Date | null, setDate: (date: Date) => void }) {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), {weekStartsOn: 1}));

    const nextWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    };

    const prevWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, -7));
    };

    const daysOfWeek = Array.from({length: 7}, (_, i) => addDays(currentWeekStart, i));
    const now = new Date();

    const isSlotDisabled = (day: Date, _startHour: number, endHour: number) => {
        const currentHour = now.getHours();
        return isBefore(day, now) || (format(day, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') && currentHour >= endHour);
    };

    const handleSlotClick = (day: Date, hour: number) => {
        const selectedDate = new Date(day);
        selectedDate.setHours(hour);
        setDate(selectedDate);
    };

    const isSelectedDate = (day: Date, hour: number) => {
        return date && format(day, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && date.getHours() === hour;
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
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                    </button>
                    <button
                        type="button"
                        onClick={nextWeek}
                        className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                    >
                        <span className="sr-only">Semaine suivante</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {daysOfWeek.map((day, index) => {
                    const isDayInPast = isBefore(day, now) && format(day, 'yyyy-MM-dd') !== format(now, 'yyyy-MM-dd');
                    return (
                        <div
                            key={index}
                            className={`border p-4 rounded-lg shadow-lg ${isDayInPast ? 'bg-gray-200' : 'bg-white'}`}
                        >
                            <div className={`text-base ${isDayInPast ? 'text-gray-500' : ''}`}>
                                {format(day, 'eeee dd MMMM', {locale: fr})}
                            </div>
                            <div className="mt-4 flex flex-col space-y-2">
                                <button
                                    onClick={() => handleSlotClick(day, 8)}
                                    type="button"
                                    disabled={isSlotDisabled(day, 8, 10)}
                                    className={`${
                                        isSlotDisabled(day, 8, 10) ? 'bg-gray-400 cursor-not-allowed' :
                                            isSelectedDate(day, 8) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                    } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                >
                                    8:00 - 10:00
                                </button>
                                <button
                                    onClick={() => handleSlotClick(day, 10)}
                                    type="button"
                                    disabled={isSlotDisabled(day, 10, 12)}
                                    className={`${
                                        isSlotDisabled(day, 10, 12) ? 'bg-gray-400 cursor-not-allowed' :
                                            isSelectedDate(day, 10) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                    } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                >
                                    10:00 - 12:00
                                </button>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300"/>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-2 text-sm text-gray-500">Pause</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSlotClick(day, 14)}
                                    type="button"
                                    disabled={isSlotDisabled(day, 14, 16)}
                                    className={`${
                                        isSlotDisabled(day, 14, 16) ? 'bg-gray-400 cursor-not-allowed' :
                                            isSelectedDate(day, 14) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                    } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                >
                                    14:00 - 16:00
                                </button>
                                <button
                                    onClick={() => handleSlotClick(day, 16)}
                                    type="button"
                                    disabled={isSlotDisabled(day, 16, 18)}
                                    className={`${
                                        isSlotDisabled(day, 16, 18) ? 'bg-gray-400 cursor-not-allowed' :
                                            isSelectedDate(day, 16) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                    } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                >
                                    16:00 - 18:00
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
