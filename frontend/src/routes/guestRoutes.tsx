import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        element: getLayout(<div>Home</div>)
    }
]

export default guestRoutes;