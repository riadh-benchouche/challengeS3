import {RouteObject} from "react-router-dom";
import {getLayout} from "@/routes/getLayout.tsx";
import Appointments from "@/pages/client/Appointment.tsx";
import MyBookings from "@/pages/client/MyBookings.tsx";
import EditAppointment from "@/pages/client/EditAppointment.tsx";

const clientRoutes: RouteObject[] = [
    {
        path: "/bookings",
        element: getLayout(<MyBookings/>, false, true, false, false)
    },
    {
        path: "/companies/:companyId/establishments/:establishmentId/book",
        element: getLayout(<Appointments/>, false, true, false, false)
    },
    {
        path: "/appointments/:appointmentId/edit",
        element: getLayout(<EditAppointment/>, false, true, false, false)
    }
]


export default clientRoutes;

