import Button from "@/components/Button.tsx";
import Input from "@/components/Input.tsx";
import React, {useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useNavigate} from "react-router-dom";
import {XCircleIcon} from '@heroicons/react/20/solid'
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    id: string
    username: string
    roles: string[]
    iat: number
    exp: number
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('') // Reset error on new submission

        try {
            const response = await axiosInstance.post('/login', {email, password})
            const decoded: DecodedToken = jwtDecode(response.data.token);

            // Store user data
            if (decoded?.roles) {
                localStorage.setItem('roles', JSON.stringify(decoded?.roles))
                localStorage.setItem('userId', decoded?.id)
                localStorage.setItem('email', decoded?.username)
            }
            localStorage.setItem('token', 'Bearer ' + response.data.token)

            // Navigate based on role
            if (decoded?.roles.includes('ROLE_ADMIN')) {
                navigate('/admin/dashboard')
            } else if (decoded?.roles.includes('ROLE_COMPANY')) {
                navigate('/organization/dashboard')
            } else {
                navigate('/')
            }
        } catch (err: any) {
            console.error(err)
            // Handle specific error messages
            if (err.response?.data?.message) {
                switch (err.response.data.message) {
                    case 'Votre compte est en attente de validation par un administrateur.':
                        setError('Votre compte est en cours de validation. Vous recevrez un email une fois validé.')
                        break
                    case 'Votre compte a été rejeté par un administrateur.':
                        setError('Votre compte a été rejeté. Veuillez contacter le support pour plus d\'informations.')
                        break
                    case 'Votre compte a été suspendu.':
                        setError('Votre compte est actuellement suspendu. Veuillez contacter le support.')
                        break
                    default:
                        setError('Email ou mot de passe incorrect')
                }
            } else {
                setError('Une erreur est survenue. Veuillez réessayer.')
            }
        }
    }

    return (
        <>
            <div className="flex flex-col flex-1 mx-auto w-full max-w-sm lg:w-96">
                <div className="mt-auto">
                    <img
                        className="h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Connectez-vous à votre compte
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Vous n'avez pas de compte ?{' '}
                        <a href="/register" className="font-semibold text-primary-600 hover:text-primary-500">
                            Créer un compte
                        </a>
                    </p>
                </div>

                {error && (
                    <div className="mt-5 rounded-md bg-red-50 p-4">
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
                )}

                <div className="mt-5">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="exemple@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Mot de passe"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="flex items-center justify-end">
                            <div className="text-sm leading-6">
                                <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Connexion
                        </Button>
                    </form>
                </div>

                <div className="mt-auto">
                    <p className="text-sm text-gray-500 text-center">
                        Vous souhaitez ouvrir un compte ?{' '} <br/>
                        <a href="/register-company" className="font-semibold text-primary-600 hover:text-primary-500">
                            Créer un compte professionnel
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}