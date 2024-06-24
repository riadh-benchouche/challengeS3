import SideBarModal from "@/components/SideBarModal.tsx";
import {useState} from "react";
import CompanyForm from "@/pages/admin/forms/CompanyForm.tsx";

const companies = [
    {
        name: "ABC Développement",
        siret: "12345678900011",
        kbis: "2019B01234",
        status: "Actif",
        adresse: "15 Rue de l'Innovation, 75008 Paris, France",
        formeJuridique: "SARL",
        date_creation: "2019-01-15"
    },
    {
        name: "Techno Solutions",
        siret: "98765432100022",
        kbis: "2018C05678",
        status: "Actif",
        adresse: "42 Avenue des Champs-Élysées, 75008 Paris, France",
        formeJuridique: "SAS",
        date_creation: "2018-10-10"
    },
    {
        name: "Éco Vert",
        siret: "45678912300033",
        kbis: "2020D03456",
        status: "En Attente",
        adresse: "100 Rue de la Liberté, 69001 Lyon, France",
        formeJuridique: "SA",
        date_creation: "2020-03-05"
    }
]
export default function Companies() {
    const [openCreate, setOpenCreate] = useState(false)
    return (
        <>
            <SideBarModal open={openCreate} setOpen={setOpenCreate} title="Ajouter une entreprise"
                          description="Ajoutez une nouvelle entreprise"
                          handleSubmit={(e) => e.preventDefault()}>
                <CompanyForm type="create"/>
            </SideBarModal>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Entreprises</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Une liste de toutes les entreprises de votre compte, y compris leur nom, siret, kbis,
                            statut,
                            adresse, forme juridique et date de création.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setOpenCreate(true)}
                            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                            Ajouter une entreprise
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Nom
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Siret
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Kbis
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Statut
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Adresse
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Forme Juridique
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Date de création
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                    {companies.map((company) => (
                                        <tr key={company.name}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {company.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{company.kbis}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{company.siret}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{company.status}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{company.adresse}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{company.formeJuridique}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{company.date_creation}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    onClick={() => setOpenCreate(true)}
                                                    className="text-primary-600 hover:text-primary-900">
                                                    Modifier<span className="sr-only">, {company.name}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}