import Topbar from '/src/components/topbar'
import Leftbar from '/src/components/leftbar'
import Job from './job'

export default function Jobs()
{
    return (
        <>
            <Topbar />
            <div className="flex">
                <Leftbar/>
                <div className="w-5/12 p-5">
                    <div className="flex flex-col gap-5">
                        <Job />
                        <Job />
                        <Job />
                    </div>
                </div>
            </div>
        </>
    )
}