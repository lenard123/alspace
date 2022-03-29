import { Outlet } from 'react-router-dom'
import Topbar from './components/Topbar'

const MainLayout = () => (
    <div className='bg-gray-50 min-h-screen text-gray-700 flex flex-col'>

        <Topbar />
        
        <div>
            <Outlet />
        </div>

    </div>
)

export default MainLayout