import ErrorBoundary from '@/js/fallback/ErrorBoundary'
import useMessageReceivedListener from '@/js/listeners/useMessageReceivedListener'
import { Outlet } from 'react-router-dom'
import DrawerMenu from './components/DrawerMenu'
import Topbar from './components/Topbar'

const MainLayout = () => {

    useMessageReceivedListener()

    return (
        <div className='bg-gray-50 min-h-screen text-gray-700 flex flex-col'>

            <Topbar />
            <DrawerMenu />
            <div>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>

        </div>
    )
}
export default MainLayout