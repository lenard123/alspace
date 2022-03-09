import './rightbar.css'
import AnnouncementCard from './announcement-card'

export default function Rightbar(props) {
    return (
        <div {...props}>
            <div className="rightbar p-5">
                <div className="mb-2 text-gray-600 text-xl font-bold">Announcements</div>

                <AnnouncementCard/>
                <AnnouncementCard/>
                <AnnouncementCard/>

            </div>
        </div>
    )
}