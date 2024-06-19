import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Home from "@/pages/guest/Home.tsx";

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        element: getLayout(<Home/>)
    }
]

export default guestRoutes;