import {RouteObject} from "react-router-dom";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import NotFound from "@/pages/maintenances/NotFound.tsx";
import Forbidden from "@/pages/maintenances/Forbidden.tsx";
import ErrorPage from "@/pages/maintenances/ErrorPage.tsx";
import adminRoutes from "@/routes/adminRoutes.tsx";
import guestRoutes from "@/routes/guestRoutes.tsx";
import clientRoutes from "@/routes/clientRoutes.tsx";
import organizationRoutes from "@/routes/organizationRoutes.tsx";
import {getLayout} from "@/routes/getLayout.tsx";
import RegisterCompany from "@/pages/auth/RegisterCompany.tsx";


const authRoutes: RouteObject[] = [
    {
        path: "/login",
        element: getLayout(<Login/>, false, false, false, true)
    },
    {
        path: "/register",
        element: getLayout(<Register/>, false, false, false, true)
    },
    {
        path: "/register-company",
        element: getLayout(<RegisterCompany/>, false, false, false, true)
    },
    {
        path: "/forgot-password",
        element: getLayout(<div>Forgot Password</div>)
    },
    {
        path: "/reset-password",
        element: getLayout(<div>Reset Password</div>)
    },
    {
        path: "/verify-email",
        element: getLayout(<div>Verify Email</div>)
    }
]


export const routes: RouteObject[] = [
    ...authRoutes,
    ...adminRoutes,
    ...clientRoutes,
    ...guestRoutes,
    ...organizationRoutes,
    {
        path: "/forbidden",
        element: <Forbidden/>
    },
    {
        path: "/*",
        element: <NotFound/>
    }
].map((route) => ({...route, errorElement: <ErrorPage/>}))