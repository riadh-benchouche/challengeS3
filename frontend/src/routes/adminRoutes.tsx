import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Companies from "@/pages/admin/Companies.tsx";
import AdminDashboard from "@/pages/admin/Dashboard.tsx";

const adminRoutes: RouteObject[] = [
    {
        path: "/admin/dashboard",
        element: getLayout(<AdminDashboard/>, true, false, false, false)
    },
    {
        path: "/admin/companies",
        element: getLayout(<Companies/>, true, false, false, false)
    },
]

export default adminRoutes;

