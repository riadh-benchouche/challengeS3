import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Home from "@/pages/guest/Home.tsx";
import Providers from "@/pages/guest/Providers.tsx";
import ProviderDetails from "@/pages/guest/ProviderDetails.tsx";
import Establishment from "@/pages/guest/Establishment.tsx";

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        element: getLayout(<Home/>)
    },
    {
        path: "/providers",
        element: getLayout(<Providers/>)
    },
    {
        path: "/providers/:providerId",
        element: getLayout(<ProviderDetails/>)
    },
    {
        path: "/providers/:providerId/establishments/:establishmentId",
        element: getLayout(<Establishment/>)
    }
]

export default guestRoutes;