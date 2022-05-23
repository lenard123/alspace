import Topbar from "@/js/components/Topbar/Topbar";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { Carousel } from "antd";
import Helmet from 'react-helmet'
import GuestTopbar from "./components/GuestTopbar";


const contentStyle = {
    height: 'min(300px, 60vw)',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    background: '#364d79',
};

const features = [
    {
        key: 'jobs',
        message: `
            This will be an ideal feature for
            Alumni. After graduating,
            alumni will have access to jobs
            posted through the Alspace
            website. It provide detailed job
            descriptions, qualifications, and
            skills needed to apply for a job.
        `,
        title: 'Looking for a Job?',
        icon: 'https://res.cloudinary.com/djasbri35/image/upload/v1651316950/assets/temp/3_1_v4lclt.png',
    },
    {
        key: 'events',
        message: `
            This feature will enable Alumni
            of UCC to stay on top of what is
            going on, what is happening,
            and future events. This website
            is available on smart phones
            and pesonal computer. It is
            designed to inform alumni
            about the events.`,
        title: 'Come and Join Us!',
        icon: 'https://res.cloudinary.com/djasbri35/image/upload/v1651316954/assets/temp/4_rfqdjq.png'
    },
    {
        key: 'social',
        message: `
            This feature allows alumni
            to contact the admin much
            easier and have a specific time
            to attend items suggested by
            alumni. Also it can be used to
            socialize with alumni friends.
        `,
        title: 'Associate with Alumni',
        icon: 'https://res.cloudinary.com/djasbri35/image/upload/v1651316958/assets/temp/talking-icon-png-17_1_nftxy3.png'
    }
]

export default function LandingPage() {

    const currentUser = useCurrentUser()
    const isLoggedIn = currentUser !== null

    return (
        <div className='bg-gray-200 min-h-screen text-gray-700 flex flex-col'>

            <Helmet>
                <title>Alspace - A place for UCC CSD Alumni</title>
            </Helmet>

            {isLoggedIn ? <Topbar/> : <GuestTopbar />}
            <Carousel>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            {/* <Alert type='info' message='SIGN UP NOW! BE PART OF OUR COMMUNITY!' banner closable/> */}

            <div className='page-wrapper py-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {features.map(({ icon, title, message, key }) => (
                        <div key={key} className='bg-white p-4 pr-8 items-start shadow flex gap-4 flex-col sm:flex-row md:flex-col'>
                            <img
                                height={60}
                                src={icon}
                            />
                            <div>
                                <h2 className='text-md font-bold text-gray-700'>{title}</h2>
                                <p>{message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}