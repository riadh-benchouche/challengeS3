import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Home from "@/pages/guest/Home.tsx";
import Companies from "@/pages/guest/Companies.tsx";
import CompanyDetails from "@/pages/guest/CompanyDetails.tsx";
import Establishment from "@/pages/guest/Establishment.tsx";

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        element: getLayout(<Home/>)
    },
    {
        path: "/companies",
        element: getLayout(<Companies/>)
    },
    {
        path: "/companies/:companyId",
        element: getLayout(<CompanyDetails/>)
    },
    {
        path: "/companies/:companyId/establishments/:establishmentId",
        element: getLayout(<Establishment/>)
    }
]

export default guestRoutes;