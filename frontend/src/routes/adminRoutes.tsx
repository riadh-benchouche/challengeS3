import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Dashboard from "@/pages/dashboard/Dashboard.tsx";

const adminRoutes: RouteObject[] = [
    {
        path: "/admin/dashboard",
        element: getLayout(<Dashboard/>, true, false, false, false)
    }

]

export default adminRoutes;

