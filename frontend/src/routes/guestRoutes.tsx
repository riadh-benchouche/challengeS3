import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Home from "@/pages/guest/Home.tsx";
import Providers from "@/pages/guest/Providers.tsx";
import ProviderDetails from "@/pages/guest/ProviderDetails.tsx";

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
        path: "/providers/:id",
        element: getLayout(<ProviderDetails/>)
    }
]

export default guestRoutes;