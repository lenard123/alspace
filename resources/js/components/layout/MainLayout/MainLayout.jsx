import ErrorBoundary from '@/js/fallback/ErrorBoundary'
import useMessageReceivedListener from '@/js/listeners/useMessageReceivedListener'
import { Outlet } from 'react-router-dom'
import Topbar from '../../Topbar/Topbar'

const MainLayout = () => {

    useMessageReceivedListener()

    return (
        <div className='bg-gray-50 min-h-screen text-gray-700 flex flex-col'>

            <Topbar/>
            <div className='flex-grow flex flex-col children:w-full'>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </div>

        </div>
    )
}
export default MainLayout