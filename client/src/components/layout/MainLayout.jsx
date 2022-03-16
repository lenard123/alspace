import { Outlet } from 'react-router-dom'
import Topbar from '/src/components/layout/Topbar'
import Sidebar from '/src/components/layout/Sidebar'

export default ({children}) => (
    <div className='bg-gray-100 min-h-screen text-gray-700 flex flex-col'>

        <Topbar />
        
        <div className="flex-grow grid grid-cols-3 lg:grid-cols-4 gap-2 sm:mx-4">

            <Sidebar />

            <main className='lg:border-l border-gray-300 col-span-3'>
                <Outlet />
            </main>

        </div>

    </div>
)