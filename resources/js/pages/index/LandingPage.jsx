import Footer from "@/js/components/Footer/Footer";
import Topbar from "@/js/components/Topbar/Topbar";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { Button, Carousel, Image } from "antd";
import Helmet from 'react-helmet'
import { Link } from "react-router-dom";
import GuestTopbar from "./components/GuestTopbar";

const image = 'https://export-download.canva.com/c625b8db-2ec0-4c4b-bf03-d656640b00af/0/0001-27580224269.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20220531%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220531T121750Z&X-Amz-Expires=81414&X-Amz-Signature=b1ca4b4230151d98f20d526d53c4c6bc1343cbe350da6180410655365fdd6b87&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Welcome%2520to%2520the%2520club.png&response-expires=Wed%2C%2001%20Jun%202022%2010%3A54%3A44%20GMT'

const contentStyle = {
    height: 'min(300px, 60vw)',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    background: '#364d79',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${image})`,
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

            {isLoggedIn ? <Topbar /> : <GuestTopbar />}

            <div className="text-center py-16">
                <h1 className="font-black text-4xl">Alumni Manage System</h1>
                <p>A place where for CSD Alumni</p>
                {!isLoggedIn && <Link to='/register'><Button type='primary' shape='round' size='large'>Sign up now</Button></Link> }

                <div className='page-wrapper mt-8'>
                    <Carousel className="max-w-screen-md mx-auto">
                        <Image className='rounded-lg' src='/images/1.png' />
                        <Image className='rounded-lg' src='/images/2.png' />
                        <Image className='rounded-lg' src='/images/3.png' />
                        <Image className='rounded-lg' src='/images/4.png' />
                        <Image className='rounded-lg' src='/images/5.png' />
                    </Carousel>
                </div>

            </div>


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

            <Footer />
        </div>
    )
}