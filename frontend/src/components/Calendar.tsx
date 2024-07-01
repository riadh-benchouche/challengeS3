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

    const isMorningDisabled = (day: Date) => {
        const currentHour = now.getHours();
        return isBefore(day, now) || (format(day, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') && currentHour >= 7);
    };

    const isAfternoonDisabled = (day: Date) => {
        const currentHour = now.getHours();
        return isBefore(day, now) || (format(day, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd') && currentHour >= 12);
    };

    const handleMorningClick = (day: Date) => {
        const selectedDate = new Date(day);
        selectedDate.setHours(9);
        setDate(selectedDate);
    };

    const handleAfternoonClick = (day: Date) => {
        const selectedDate = new Date(day);
        selectedDate.setHours(13);
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
                                {format(day, 'eeee dd/MM', {locale: fr})}
                            </div>
                            <div className="mt-4 flex flex-col space-y-2">
                                <button
                                    onClick={() => handleMorningClick(day)}
                                    type="button"
                                    disabled={isMorningDisabled(day)}
                                    className={`${
                                        isMorningDisabled(day) ? 'bg-gray-400 cursor-not-allowed' :
                                            isSelectedDate(day, 8) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                    } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                >
                                    Matin
                                </button>
                                <button
                                    onClick={() => handleAfternoonClick(day)}
                                    type="button"
                                    disabled={isAfternoonDisabled(day)}
                                    className={`${
                                        isAfternoonDisabled(day) ? 'bg-gray-400 cursor-not-allowed' :
                                            isSelectedDate(day, 14) ? 'bg-secondary-500' : 'bg-primary-500 hover:bg-primary-600'
                                    } text-white px-3 py-2 rounded-md shadow transition duration-300`}
                                >
                                    Après-midi
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
