import Input from "@/components/Input.tsx";
import React, {useState} from "react";
import Button from "@/components/Button.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";
import {XCircleIcon} from "@heroicons/react/20/solid";

export default function Home() {
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            axiosInstance.get(`/api/experts?search=${search}`).then(response => {
                setLoading(false)
                console.log(response.data)
            })
        } catch (error: any) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <>
            <div className="text-center max-w-2xl mx-auto pt-52">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Vous cherchez des experts <span className="text-primary-600"> IT ?</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Trouvez et réservez facilement des consultations avec des auditeurs informatiques de confiance. nos
                    experts certifiés sont à votre disposition.
                </p>
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
                <div
                    className="mt-10 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 -mx-6 lg:rounded-2xl lg:p-4">
                    <form onSubmit={handleSubmit} className="flex flex-1 items-center justify-center gap-x-2">
                        <Input
                            className="py-3"
                            type="text"
                            placeholder="Rechercher des experts IT"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Button className="w-fit mt-2 py-3 px-6"
                                type="submit">
                            {loading ? 'Loading...' : 'Search'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}