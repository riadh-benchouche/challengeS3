import React, {useEffect, useMemo, useState} from 'react'
import {Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon, UserIcon} from '@heroicons/react/24/outline'

const footerNavigation = {
    solutions: [
        {name: 'Marketing', href: '#'},
        {name: 'Analytics', href: '#'},
        {name: 'Commerce', href: '#'},
        {name: 'Insights', href: '#'},
    ],
    support: [
        {name: 'Pricing', href: '#'},
        {name: 'Documentation', href: '#'},
        {name: 'Guides', href: '#'},
    ],
    company: [
        {name: 'About', href: '#'},
        {name: 'Blog', href: '#'},
        {name: 'Jobs', href: '#'},
        {name: 'Press', href: '#'},
        {name: 'Partners', href: '#'},
    ],
    legal: [
        {name: 'Claim', href: '#'},
        {name: 'Privacy', href: '#'},
        {name: 'Terms', href: '#'},
    ],
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function logout() {
    localStorage.clear();
    window.location.href = "/login";
}

export default function GuestLayout({children}: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const roles = useMemo(() => JSON.parse(localStorage.getItem("roles") || "[]"), []);

    const [navigation, setNavigation] = useState([] as { name: string, href: string }[])

    useEffect(() => {
        if (Object.values(roles).includes("ROLE_CLIENT")) {
            setNavigation([
                {name: 'Préstataires', href: '/companies'},
                {name: 'Mes réservations', href: '/bookings'},
            ]);
        } else {
            setNavigation([
                {name: 'Préstataires', href: '/companies'},
            ]);
        }
    }, [roles]);

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href}
                               className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {Object.values(roles).includes("ROLE_CLIENT") && (
                            <div className="flex flex-1 justify-end">
                                <div className="flex items-center gap-x-4 lg:gap-x-6">
                                    <Menu as="div" className="relative">
                                        <MenuButton className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            <span className="lg:flex lg:items-center">
                                            <UserIcon className="ml-2 h-7 w-7 text-gray-400" aria-hidden="true"/>
                                        </span>
                                        </MenuButton>
                                        <Transition
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems
                                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <MenuItem>
                                                    {({focus}) => (
                                                        <button
                                                            onClick={logout}
                                                            className={classNames(
                                                                focus ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Déconnexion
                                                        </button>
                                                    )}
                                                </MenuItem>
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        )}
                        {!Object.values(roles).includes("ROLE_CLIENT") && (
                            <a
                                href="/login"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Se connecter <span aria-hidden="true">&rarr;</span>
                            </a>
                        )}
                    </div>
                </nav>
                <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50"/>
                    <DialogPanel
                        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {Object.values(roles).includes("ROLE_CLIENT") && (
                                        <a
                                            href="/profile"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            <UserIcon className="h-6 w-6 mr-2" aria-hidden="true"/>
                                        </a>
                                    )}
                                    {!Object.values(roles).includes("ROLE_CLIENT") && (
                                        <a
                                            href="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Se connecter <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
            <div className="mx-auto">
                {children}
            </div>
            <footer className="bg-white" aria-labelledby="footer-heading">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <img
                            className="h-7"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Company name"
                        />
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-gray-900">Solutions</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footerNavigation.solutions.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href}
                                                   className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footerNavigation.support.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href}
                                                   className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href}
                                                   className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footerNavigation.legal.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href}
                                                   className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}