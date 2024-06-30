import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import OrganizationDashboard from "@/pages/organization/Dashboard.tsx";
import OrganizationEstablishment from "@/pages/organization/Establishment.tsx";
import OrganizationEmployees from "@/pages/organization/Employees.tsx";
import OrganizationCalendar from "@/pages/organization/Calendar.tsx";
import EstablishmentDetail from "@/pages/organization/EstablishmentDetail.tsx";

const organizationRoutes: RouteObject[] = [
    {
        path: "/organization/dashboard",
        element: getLayout(<OrganizationDashboard/>, false, false, true, false)
    },
    {
        path: "/organization/establishment",
        element: getLayout(<OrganizationEstablishment/>, false, false, true, false)
    },
    {
        path: "/organization/establishment/:id",
        element: getLayout(<EstablishmentDetail/>, false, false, true, false)
    },
    {
        path: "/organization/employees",
        element: getLayout(<OrganizationEmployees/>, false, false, true, false)
    },
    {
        path: "/organization/calendar",
        element: getLayout(<OrganizationCalendar/>, false, false, true, false)
    }
]

export default organizationRoutes;