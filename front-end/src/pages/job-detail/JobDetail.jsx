import Topbar from '/src/components/topbar'
import Leftbar from '/src/components/leftbar'

export default function JobDetail() {
    return (
        <>
            <Topbar />
            <div className="flex">
                <Leftbar/>
                <div className="w-5/12 p-5">

                </div>
            </div>
        </>
    )
}