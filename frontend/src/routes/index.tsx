import {Fragment} from "react/jsx-runtime";
import {RouteObject} from "react-router-dom";
import Login from "../pages/auth/Login.tsx";
import Layout from "../components/layout";
import Register from "../pages/auth/Register.tsx";
import NotFound from "../pages/maintenances/NotFound.tsx";
import Forbidden from "../pages/maintenances/Forbidden.tsx";
import ErrorPage from "../pages/maintenances/ErrorPage.tsx";


const getLayout = (
    element: JSX.Element,
    adminSecurity = false,
    clientSecurity = false,
    isAuth = false
): JSX.Element => (
    <Layout adminSecurity={adminSecurity} isAuth={isAuth} clientSecurity={clientSecurity}>
        <Fragment>
            {element}
        </Fragment>
    </Layout>
)

const authRoutes: RouteObject[] = [
    {
        path: "/login",
        element: getLayout(<Login/>, false, true)
    },
    {
        path: "/register",
        element: getLayout(<Register/>, false, true)
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

const adminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: getLayout(<div>Admin</div>, true, false, false)
    }
]

const clientRoutes: RouteObject[] = [
    {
        path: "/client",
        element: getLayout(<div>Client</div>, false, true, false)
    }
]

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        element: getLayout(<div>Home</div>)
    }
]


export const routes: RouteObject[] = [
    ...authRoutes,
    ...adminRoutes,
    ...clientRoutes,
    ...guestRoutes,
    {
        path: "/forbidden",
        element: <Forbidden/>
    },
    {
        path: "/*",
        element: <NotFound/>
    }
].map((route) => ({...route, errorElement: <ErrorPage/>}))