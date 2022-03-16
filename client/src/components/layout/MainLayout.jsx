import Topbar from '/src/components/layout/Topbar'
import Sidebar from '/src/components/layout/Sidebar'

export default ({children}) => (
    <div className='bg-gray-100 min-h-screen text-gray-700'>

        <Topbar />
        
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 mx-4">

            <Sidebar />

            <main className='col-span-3'>
                { children }
            </main>

        </div>

    </div>
)