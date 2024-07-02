import Input from "@/components/Input.tsx";
import React, {useEffect, useState} from "react";
import {EstablishmentType} from "@/types/establishment.ts";
import Button from "@/components/Button.tsx";
import axiosInstance from "@/utils/axiosInstance.ts";

export default function EstablishmentForm({type = 'create', onClose, establishment}: {
    type: 'create' | 'edit',
    onClose: () => void
    establishment?: EstablishmentType
}) {

    const [name, setName] = useState<string>('')
    const [adress, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [zipCode, setZipCode] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    useEffect(() => {
        if (establishment) {
            setName(establishment.name)
            setAddress(establishment.adress)
            setCity(establishment.city)
            setZipCode(establishment.zipCode)
            setCountry(establishment.country)
            setPhone(establishment.phone)
        }
    }, [establishment])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (type === 'create') {
            axiosInstance.post('/api/establishments', {
                company: '/api/companies/' + localStorage.getItem('userId'),
                name,
                adress,
                city,
                zipCode,
                country,
                phone
            }).then(() => {
                onClose()
            }).catch(err => {
                console.log(err)
            })
        }

        if (type === 'edit' && establishment) {
            axiosInstance.patch(`/api/establishments/${establishment?.id}`, {
                company: '/api/companies/' + localStorage.getItem('userId'),
                name,
                adress,
                city,
                zipCode,
                country,
                phone
            }).then(() => {
                onClose()
            }).catch(err => {
                console.log(err)
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
                                        label="Adresse"
                                        type="text"
                                        placeholder="Adresse de l'entreprise"
                                        value={adress}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required={true}
                                    />
                                    <Input
                                        label="Ville"
                                        type="text"
                                        placeholder="Ville de l'entreprise"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required={true}
                                    />
                                    <Input
                                        label="Code postal"
                                        type="text"
                                        placeholder="Code postal de l'entreprise"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        required={true}
                                    />
                                    <Input
                                        label="Pays"
                                        type="text"
                                        placeholder="Pays de l'entreprise"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required={true}
                                    />
                                    <Input
                                        label="Téléphone"
                                        type="text"
                                        placeholder="Téléphone de l'entreprise"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required={true}
                                    />
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