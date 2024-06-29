import StatCard from "@/components/Dashboard/StatCard.tsx";
import {UsersIcon} from "@heroicons/react/24/outline";
import {CursorArrowRaysIcon, EnvelopeOpenIcon} from "@heroicons/react/16/solid";


const stats = [
    { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
    { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]
export default function AdminDashboard() {
    return (
        <>
            <StatCard stats={stats}/>
        </>
    )
}