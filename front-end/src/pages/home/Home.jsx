import Rightbar from '/src/components/rightbar'
import Feed from '/src/components/feed'

export default function Home() {
    return (
        <div className="grid grid-cols-9">        
            <Feed className="col-span-5"/>
            <Rightbar className="col-span-4"/>
        </div>
    )
}