import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import GuestLayout from "./GuestLayout.tsx";
import AdminLayout from "./AdminLayout.tsx";
import ClientLayout from "./ClientLayout.tsx";
import AuthLayout from "./AuthLayout.tsx";

const Layout = ({children, adminSecurity, clientSecurity, isAuth}: {
    children: React.ReactNode,
    adminSecurity: boolean,
    clientSecurity: boolean,
    isAuth: boolean
}) => {
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    useEffect(() => {
        if (adminSecurity && !Object.values(roles).includes("ROLE_ADMIN")) {
            navigate("/forbidden");
        }
        if (clientSecurity && !Object.values(roles).includes("ROLE_CLIENT")) {
            navigate("/forbidden");
        }
    }, [adminSecurity, clientSecurity, navigate, roles]);

    let LayoutComponent = GuestLayout;

    if (isAuth) {
        LayoutComponent = AuthLayout;
    } else if (adminSecurity) {
        if (Object.values(roles).includes("ROLE_ADMIN")) {
            LayoutComponent = AdminLayout;
        } else if (Object.values(roles).includes("ROLE_CLIENT")) {
            LayoutComponent = ClientLayout;
        }
    }

    return (
        <div className="h-screen flex flex-col">
            <LayoutComponent>
                {children}
            </LayoutComponent>
        </div>
    );
}

export default Layout;
