import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import GuestLayout from "@/components/layout/GuestLayout.tsx";
import AdminLayout from "@/components/layout/AdminLayout.tsx";
import ClientLayout from "@/components/layout/ClientLayout.tsx";
import AuthLayout from "@/components/layout/AuthLayout.tsx";

const Layout = ({children, adminSecurity, clientSecurity, organizationSecurity, isAuth}: {
    children: React.ReactNode,
    adminSecurity: boolean,
    clientSecurity: boolean,
    organizationSecurity: boolean,
    isAuth: boolean
}) => {
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    useEffect(() => {
        if (adminSecurity && !Object.values(roles).includes("ROLE_ADMIN")) {
            navigate("/forbidden");
        } else if (organizationSecurity && !Object.values(roles).includes("ROLE_ORGANIZATION")) {
            navigate("/forbidden");
        } else if (clientSecurity && !Object.values(roles).includes("ROLE_CLIENT")) {
            navigate("/forbidden");
        }
    }, [adminSecurity, organizationSecurity, clientSecurity, navigate, roles]);

    if (isAuth) {
        return (
            <AuthLayout>
                {children}
            </AuthLayout>
        );
    }

    if (Object.values(roles).includes("ROLE_ADMIN")) {
        return (
            <AdminLayout role={Object.values(roles)?.[0] as string}>
                {children}
            </AdminLayout>
        );
    }

    if (Object.values(roles).includes("ROLE_CLIENT")) {
        return (
            <ClientLayout>
                {children}
            </ClientLayout>
        );
    }

    if (Object.values(roles).includes("ROLE_ORGANIZATION")) {
        return (
            <AdminLayout role={Object.values(roles)?.[0] as string}>
                {children}
            </AdminLayout>
        );
    }

    return (
        <GuestLayout>
            {children}
        </GuestLayout>
    );
}

export default Layout;
