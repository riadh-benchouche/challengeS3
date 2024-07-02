import Input from "@/components/Input.tsx";
import {useState} from "react";
import Switcher from "@/components/Switcher.tsx";
import {PhotoIcon} from "@heroicons/react/16/solid";
import {Company} from "@/types/company";
import Button from "@/components/Button.tsx";

export default function CompanyForm({type = 'create', company, onClose}: {
    type: string,
    company?: Company | undefined
    onClose: () => void
}) {

    const [name, setName] = useState<string>('')
    const [status, setStatus] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [kbisFile, setKbisFile] = useState<File>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (type === 'create') {

        }

        if (type === 'edit') {

        }
    }

    return (
        <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
              onSubmit={handleSubmit}>
            <div className="h-0 flex-1 overflow-y-auto">
                <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6 py-8">
                        <div className="flex flex-1 flex-col">
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
                                        label="Email"
                                        type="email"
                                        placeholder="company@exemple.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required={true}
                                    />
                                    <Input
                                        label="Mot de passe"
                                        type="password"
                                        placeholder="********"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required={true}
                                    />
                                    <Switcher
                                        title="Statut"
                                        description="Activez la société"
                                        enabled={status}
                                        setEnabled={setStatus}/>
                                    <Input
                                        label="Image"
                                        type="text"
                                        placeholder="URL de l'image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Fichier KBIS
                                        </label>
                                        <div
                                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300"
                                                           aria-hidden="true"/>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                                                    >
                                                        <span>{kbisFile ? kbisFile.name : 'Choisissez un fichier'}</span>
                                                        <input
                                                            onChange={(e) => setKbisFile(e.target.files![0])}
                                                            id="file-upload" name="file-upload" type="file"
                                                            className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1">{kbisFile ? 'Sélectionné' : 'Aucun fichier sélectionné'}</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">{kbisFile ? 'Le fichier doit être au format PDF' : 'Le fichier doit être au format PDF'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-8">
                                <Button
                                    type="submit"
                                    primary={true}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}