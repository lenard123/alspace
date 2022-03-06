import Topbar from '/src/components/topbar'
import Leftbar from '/src/components/leftbar'
import Rightbar from '/src/components/rightbar'
import Feed from './feed'

export default function Home() {
    return (
        <>
            <Topbar />
            <div className="flex">
                <Leftbar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}