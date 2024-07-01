import Input from "@/components/Input.tsx";
import Button from "@/components/Button.tsx";
import React, {useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useNavigate} from "react-router-dom";
import {XCircleIcon} from "@heroicons/react/20/solid";
import {PhotoIcon} from "@heroicons/react/16/solid";

export default function RegisterCompany() {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [kbis, setKbis] = useState<string>('')
    const [kbisFile, setKbisFile] = useState<File | null>(null)
    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setKbisFile(e.target.files[0])
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('kbis', kbis)
        if (kbisFile) {
            formData.append('kbisFile', kbisFile)
        }
        axiosInstance.post('/companies', formData).then(() => {
            navigate('/login')
        }).catch(e => {
            console.error(e)
            setError('Erreur lors de la création du compte')
        })
    }

    return (
        <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
                <img
                    className="h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Créez un compte d'entreprise
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Vous avez déjà un compte ?{' '}
                    <a href="/login" className="font-semibold text-primary-600 hover:text-primary-500">
                        Connectez-vous
                    </a>
                </p>
            </div>
            {error && (
                <div className="mt-5">
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-5">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Nom"
                            type="text"
                            placeholder="Nom de l'entreprise"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <div className="col-span-full">
                            <label htmlFor="cover-photo"
                                   className="block text-sm font-medium leading-6 text-gray-900">
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
                                            <input id="file-upload" name="file-upload" type="file"
                                                   onChange={changeFile}
                                                   className="sr-only"/>
                                        </label>
                                        {kbisFile ? (
                                            <p className="pl-1">Fichier sélectionné : {kbisFile.name}</p>
                                        ) : (
                                            <p className="pl-1">ou glissez et déposez</p>
                                        )}
                                    </div>
                                    {!kbisFile && (
                                        <p className="text-xs leading-5 text-gray-600">JPG ou PNG jusqu'à 1 Mo</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                S'inscrire
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}