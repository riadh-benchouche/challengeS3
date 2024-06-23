import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Dashboard from "@/pages/dashboard/Dashboard.tsx";
import Companies from "@/pages/admin/Companies.tsx";
import Administrators from "@/pages/admin/Administrators.tsx";

const adminRoutes: RouteObject[] = [
    {
        path: "/admin/dashboard",
        element: getLayout(<Dashboard/>, true, false, false, false)
    },
    {
        path: "/admin/companies",
        element: getLayout(<Companies/>, true, false, false, false)
    },
    {
        path: "/admin/administrators",
        element: getLayout(<Administrators/>, true, false, false, false)
    }

]

export default adminRoutes;

