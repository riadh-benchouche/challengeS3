import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";

const organizationRoutes: RouteObject[] = [
    {
        path: "/organization",
        element: getLayout(<div>Organization</div>, false, false, true, false)
    }
]

export default organizationRoutes;