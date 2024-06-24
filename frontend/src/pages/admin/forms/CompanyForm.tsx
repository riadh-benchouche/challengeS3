import Input from "@/components/Input.tsx";
import {useState} from "react";
import Switcher from "@/components/Switcher.tsx";
import {PhotoIcon} from "@heroicons/react/16/solid";

export default function CompanyForm({type = 'create', id}: { type: 'create' | 'edit', id?: string }) {

    const [name, setName] = useState<string>('')
    const [siret, setSiret] = useState<string>('')
    const [kbis, setKbis] = useState<string>('')
    const [status, setStatus] = useState<boolean>(false)
    const [adresse, setAdresse] = useState<string>('')
    const [formeJuridique, setFormeJuridique] = useState<string>('')
    const [dateCreation, setDateCreation] = useState<string>('')

    if (type === 'edit' && !id) {
        return null
    }

    if (type === 'edit' && id) {
        // Fetch the admin by id
        // const company = fetchCompanyById(id)
    }

    return (
        <>
            <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                    <Input
                        label="Nom"
                        type="text"
                        placeholder="Nom de l'entreprise"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                    <Input
                        label="SIRET"
                        type="text"
                        placeholder="12345678900011"
                        value={siret}
                        onChange={(e) => setSiret(e.target.value)}
                        required={true}
                    />
                    <Input
                        label="KBIS"
                        type="text"
                        placeholder="2019B01234"
                        value={kbis}
                        onChange={(e) => setKbis(e.target.value)}
                        required={true}
                    />
                    <Switcher
                        title="Statut"
                        description="Activez la société"
                        enabled={status}
                        setEnabled={setStatus}/>
                    <Input
                        label="Adresse"
                        type="text"
                        placeholder="15 Rue de l'Innovation, 75008 Paris, France"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required={true}
                    />
                    <Input
                        label="Forme Juridique"
                        type="text"
                        placeholder="SARL"
                        value={formeJuridique}
                        onChange={(e) => setFormeJuridique(e.target.value)}
                        required={true}
                    />
                    <Input
                        label="Date de création"
                        type="date"
                        placeholder="2021-01-01"
                        value={dateCreation}
                        onChange={(e) => setDateCreation(e.target.value)}
                        required={true}
                    />

                    <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Fichier KBIS
                        </label>
                        <div
                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                                    >
                                        <span>Ajouter un fichier</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                    </label>
                                    <p className="pl-1">ou glissez et déposez</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">JPG ou PNG jusqu'à 1 Mo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}