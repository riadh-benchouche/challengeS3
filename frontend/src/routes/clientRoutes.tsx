import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";

const clientRoutes: RouteObject[] = [
    {
        path: "/bookings",
        element: getLayout(<div>Client</div>, false, true, false, false)
    }
]


export default clientRoutes;

