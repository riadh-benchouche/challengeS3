import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'

const meetings = [
    {
        id: 1,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    // More meetings...
]

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MyBookings() {
    return (
        <>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Mes rendez-vous
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Vous trouverez ici la liste de tous vos rendez-vous à venir.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Prochains rendez-vous</h2>
                <div className="flex flex-1 w-fulllg:gap-x-16">
                    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 w-full">
                        {meetings.map((meeting) => (
                            <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                                <img src={meeting.imageUrl} alt="" className="h-14 w-14 flex-none rounded-full"/>
                                <div className="flex-auto">
                                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
                                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                        <div className="flex items-start space-x-3">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">Date</span>
                                                <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                            </dt>
                                            <dd>
                                                <time dateTime={meeting.datetime}>
                                                    {meeting.date} at {meeting.time}
                                                </time>
                                            </dd>
                                        </div>
                                        <div
                                            className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">Location</span>
                                                <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                            </dt>
                                            <dd>{meeting.location}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <Menu as="div"
                                      className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                                    <div>
                                        <MenuButton
                                            className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                                            <span className="sr-only">Open options</span>
                                            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true"/>
                                        </MenuButton>
                                    </div>

                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <MenuItem>
                                                    {({focus}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm',
                                                            )}
                                                        >
                                                            Edit
                                                        </a>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({focus}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm',
                                                            )}
                                                        >
                                                            Cancel
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    )
}