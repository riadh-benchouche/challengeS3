import Button from "@/components/Button.tsx";
import Input from "@/components/Input.tsx";
import {useState} from "react";
import axiosInstance from "@/utils/axiosInstance.ts";
import {useNavigate} from "react-router-dom";
import {XCircleIcon} from '@heroicons/react/20/solid'
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    id: string
    roles: string[]
    iat: number
    exp: number
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axiosInstance.post('/login', {email, password}).then(r => {
            const decoded: DecodedToken = jwtDecode(r.data.token);
            if (decoded?.roles) {
                localStorage.setItem('roles', JSON.stringify(decoded?.roles))
            }
            localStorage.setItem('token', 'Bearer ' + r.data.token)
            if (decoded?.roles.includes('ROLE_ADMIN')) {
                return navigate('/admin/dashboard')
            }
            if (decoded?.roles.includes('ROLE_COMPANY')) {
                return navigate('/organization/dashboard')
            } else {
                return navigate('/')
            }
        }).catch(e => {
            console.error(e)
            setError('Email ou mot de passe incorrect')
        })
    }

    return (
        <>
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
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
                        <form className="space-y-6" onSubmit={handleSubmit}>
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
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <div className="text-sm leading-6">
                                    <a href="#"
                                       className="font-semibold text-primary-600 hover:text-primary-500">
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button type="submit" className="w-full">
                                    Connexion
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}