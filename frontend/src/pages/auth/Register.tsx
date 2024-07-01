import Input from "@/components/Input.tsx";
import Button from "@/components/Button.tsx";
import React, {useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useNavigate} from "react-router-dom";
import {XCircleIcon} from "@heroicons/react/20/solid";

export default function Register() {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [plainPassword, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axiosInstance.post('/users', {firstName, lastName, email, plainPassword}).then(() => {
            navigate('/login')
        }).catch(e => {
            console.error(e)
            setError('Erreur lors de la création du compte')
        })
    }

    return (
        <div className="mx-auto flex flex-col flex-1 w-full max-w-sm lg:w-96">
            <div>
                <img
                    className="h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Créez un compte
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
                        <div>
                            <Input label="Prénom"
                                   type="text"
                                   placeholder="John"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Input label="Nom"
                                   type="text"
                                   placeholder="Doe"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Input label="Email"
                                   type="email"
                                   placeholder="exemple@exemple.com"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Input label="Mot de passe"
                                   type="password"
                                   placeholder="********"
                                   value={plainPassword}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                S'inscrire
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-auto">
                <p className="text-sm text-gray-500 text-center">
                    Vous souhaitez ouvrir un compte ?{' '} <br/>
                    <a href="/register-company" className="font-semibold text-primary-600 hover:text-primary-500">
                        Crée un compte professionnel
                    </a>{' '}
                </p>
            </div>
        </div>
    )
}