import {EnvelopeIcon} from '@heroicons/react/20/solid'
import {Company} from "@/types/company.ts";
import {useEffect, useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useLocation} from "react-router-dom";

interface Stat {
    label: string;
    value: string;
}

export default function CompanyDetails() {
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [company, setCompany] = useState<Company | null>(null)
    const [stats, setStats] = useState<Stat[]>([]);
    useEffect(() => {
        axiosInstance.get('/api/companies/' + id)
            .then((res) => {
                setCompany(res.data);
                setStats([
                    {label: 'Date de création', value: res.data.foundationDate.split('-')[0]},
                    {label: 'Établissements', value: res.data.establishments.length},
                    {label: 'Pays', value: res.data.country},
                ]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    return (
        <>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-4">
                            <div
                                className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 h-96">
                                <img
                                    className="absolute inset-0 h-full w-full object-cover"
                                    src={company?.image}
                                    alt={company?.name}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-primary-600">À propos de nous</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {company?.name}
                                </h1>
                                <div className="max-w-xl">
                                    <p className="mt-6">
                                        {company?.description}
                                    </p>
                                </div>
                            </div>
                            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-3">
                                {stats.map((stat, statIdx) => (
                                    <div key={statIdx}>
                                        <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.label}</dt>
                                        <dd className="mt-2 text-2xl font-bold leading-10 tracking-tight text-gray-900">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos
                            établissements</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Découvrez nos établissements et prenez rendez-vous pour une consultation.
                        </p>
                    </div>
                    <ul role="list"
                        className="max-w-7xl  mt-20  mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {company?.establishments.map((establishment) => (
                            <li key={establishment.id}
                                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                <div className="flex w-full items-center justify-between space-x-6 p-6">
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-sm font-medium text-gray-900">{establishment.name}</h3>
                                        </div>
                                        <p className="mt-1 truncate text-sm text-gray-500">{establishment.adress}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="flex w-0 flex-1">
                                            <a
                                                href={'/companies/' + company.id + '/establishments/' + establishment.id}
                                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                            >
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                Prendre rendez-vous
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}