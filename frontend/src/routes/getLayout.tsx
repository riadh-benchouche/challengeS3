import Layout from "@/components/layout";

export const getLayout = (
    element: JSX.Element,
    adminSecurity = false,
    clientSecurity = false,
    organizationSecurity = false,
    isAuth = false
): JSX.Element => (
    <Layout isAuth={isAuth} clientSecurity={clientSecurity} adminSecurity={adminSecurity}
            organizationSecurity={organizationSecurity}>
        <>
            {element}
        </>
    </Layout>
)