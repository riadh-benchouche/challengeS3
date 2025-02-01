import {useEffect, useState} from "react";
import {EstablishmentType} from "@/types/establishment.ts";
import {useLocation} from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance.ts";

export default function Establishment() {
    const [establishment, setEstablishment] = useState<EstablishmentType | null>(null);
    const location = useLocation();
    const establishmentId = location.pathname.split("/").pop();
    const companyId = location.pathname.split("/")[2];

    useEffect(() => {
        axiosInstance.get('/api/establishments/' + establishmentId)
            .then((res) => {
                setEstablishment(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [establishmentId]);

    return (
        <>
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-4">
                            <div
                                className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                                <img
                                    className="absolute inset-0 h-full w-full object-cover"
                                    src={establishment?.company.image}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-primary-600">{establishment?.company.name}</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {establishment?.name}
                                </h1>
                                <div className="max-w-xl">
                                    <p className="mt-6">
                                        {establishment?.company.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-10 flex">
                                <a href={`/companies/${companyId}/establishments/${establishmentId}/book`}
                                   className="text-base font-semibold leading-7 text-primary-600">
                                    Prennez rendez-vous avec nous <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-3">
                                <div>
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">Adresse</dt>
                                    <dd className="mt-2 text-lg font-bold leading-10 tracking-tight text-gray-900">{establishment?.adress}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">Ville</dt>
                                    <dd className="mt-2 text-lg font-bold leading-10 tracking-tight text-gray-900">{establishment?.zipCode}, {establishment?.city}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-semibold leading-6 text-gray-600">Téléphone
                                    </dt>
                                    <dd className="mt-2 text-lg font-bold leading-10 tracking-tight text-gray-900">{establishment?.phone}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            {establishment?.employees && establishment?.employees?.length > 0 ? (
                <div className="pb-20 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-2xl col-span-1">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos Services</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Voici les services que nous proposons.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl col-span-2"
                    >
                        {establishment?.services.map((service) => (
                            <li key={service.name}
                                className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <span className="absolute inset-x-0 -top-px bottom-0"/>
                                            {service.name}
                                        </p>
                                        <p className="mt-1 flex text-xs leading-5 text-gray-500 truncate-m line-clamp-1">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-4">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {service.price} €
                                    </p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {service.duration} min
                                    </p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {service.employees.length} employés
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>) : (
                <div className="py-24 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-2xl col-span-1">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre équipe</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            On dirait que notre équipe n'est pas encore prête. Revenez plus tard.
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}