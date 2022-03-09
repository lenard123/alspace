import { Outlet } from 'react-router-dom'

import Topbar from '/src/components/topbar'
import Leftbar from '/src/components/leftbar'

export default function MainLayout() {
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Topbar/>
            <div className="flex">
                <Leftbar/>
                <div className="w-3/4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}