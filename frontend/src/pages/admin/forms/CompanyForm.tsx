import Input from "@/components/Input.tsx";
import {useEffect, useState} from "react";
import {PhotoIcon} from "@heroicons/react/16/solid";
import {Company} from "@/types/company";
import Button from "@/components/Button.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";

export default function CompanyForm({type = 'create', company, onClose}: {
    type: string,
    company?: Company | undefined
    onClose: () => void
}) {

    const [name, setName] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [kbisFile, setKbisFile] = useState<File>()

    useEffect(() => {
        if (type === 'edit' && company) {
            setName(company.name)
            setStatus(company.status)
            setEmail(company.email)
            setImage(company.image)
        }
    }, [type, company])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (type === 'create') {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('plainPassword', password)
            formData.append('status', status)
            formData.append('image', image)
            if (kbisFile) {
                formData.append('kbisFile', kbisFile)
            }

            try {
                const url = `/api/companies`;
                const method = 'post';

                const response = await axiosInstance({
                    method,
                    url,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data);
                onClose();
            } catch (err) {
                console.error(err);
            }
        }

        if (type === 'edit') {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('status', status)
            formData.append('image', image)

            axiosInstance.patch(`/api/companies/${company?.id}`, formData).then(() => {
                onClose()
            }).catch((error) => {
                console.log(error)
            })
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
                                    {type === 'create' && (
                                        <Input
                                            label="Mot de passe"
                                            type="password"
                                            placeholder="********"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required={true}
                                        />
                                    )}
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="PENDING">En attente</option>
                                        <option value="APPROVED">Approuvé</option>
                                        <option value="REJECTED">Rejeté</option>
                                        <option value="SUSPENDED">Suspendu</option>
                                    </select>
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
                                                <p className="text-xs leading-5 text-gray-600">{kbisFile ? 'Le fichier doit être au format JPG' : 'Le fichier doit être au format JPG'}</p>
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