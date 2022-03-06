import './leftbar.css'
import { 
    Chat, 
    Help, 
    Work, 
    Event,
    Newspaper,
    Person,
    Settings,
    Logout,
    Notifications
} from "@mui/icons-material";
import { Link } from 'react-router-dom'

export default function Leftbar() {
    return (
        <div className="leftbar">
            <div className="py-5">

                <div className="leftbar-list">
                    <Link to="/" className="leftbar-list-item">
                        <Newspaper className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Discussion</span>
                    </Link>

                    <div className="leftbar-list-item">
                        <Chat className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Chats</span>
                    </div>

                    <div className="leftbar-list-item">
                        <Notifications className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Notifications</span>
                    </div>

                    <div className="leftbar-list-item">
                        <Help className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Questions</span>
                    </div>
                    
                    <Link to="/jobs" className="leftbar-list-item">
                        <Work className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Jobs</span>
                    </Link>
                    
                    <div className="leftbar-list-item">
                        <Event className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Events</span>
                    </div>
                    
                    <div className="leftbar-list-item">
                        <Person className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Profile</span>
                    </div>
                    
                    <div className="leftbar-list-item">
                        <Settings className="leftbar-icon" />
                        <span className="leftbar-list-item-text">Settings</span>
                    </div>
                </div>
                <Link to="/login" className="leftbar-list-item">
                    <Logout className="leftbar-icon" />
                    <span className="leftbar-list-item-text">Logout</span>
                </Link>

            </div>
        </div>
    )
}