import { Avatar, Button, Image, Tabs } from "antd";
import { Outlet, useParams } from "react-router";
import Helmet from 'react-helmet'
import SkeletonLayout from "./SkeletonLayout";
import useUserQuery from "@/js/queries/useUserQuery";
import { useIsCurrentUser } from "@/js/queries/useCurrentUserQuery";
import useTabs from "./useTabs";
import { Link } from "react-router-dom";

export default function ProfileLayout() 
{
    const { id } = useParams()
    const isCurrentUser = useIsCurrentUser(id)
    const { isLoading, data: user } = useUserQuery(id)
    const { tabs, active } = useTabs(id)

    if (isLoading) return <SkeletonLayout />

    const { fullname, avatarUrl } = user

    return (
        <>
            <Helmet>
                <title>{fullname}</title>
            </Helmet>

            <div className='bg-white border-b border-gray-300'>
                <Image
                    width='100%'
                    height='min(300px, 60vw)'
                    className='object-cover'
                    src='https://res.cloudinary.com/djasbri35/image/upload/v1649750683/alspace/events/aghom7lqat9harfvaaqv.png'
                />

                <div className='page-wrapper'>
                    <div className='-mt-[60px]'>
                        <div className='flex flex-col items-center sm:flex-row sm:items-end gap-2'>
                            <Avatar
                                className='border-2 border-white'
                                src={avatarUrl}
                                size={120}
                            />

                            <div className='sm:pb-2 flex flex-col sm:flex-row justify-between flex-grow gap-2'>
                                <div className='text-2xl md:text-3xl text-center font-bold text-gray-800'>{fullname}</div>
                                <div className='flex sm:self-end justify-center'>
                                    { isCurrentUser 
                                        ? <Button size='large' type='secondary' shape='round'>Edit Profile</Button>
                                        : <Button size='large' type='secondary' shape='round'>Send Message</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultActiveKey={active} size='large' tabBarStyle={{marginBottom: 0}}>
                        {tabs.map( ({title, link}) => (
                            <Tabs.TabPane key={title} tabKey={title} tab={<Link to={link}>{title}</Link>} />
                        ))}
                    </Tabs>

                </div>
            </div>

            <div className='page-wrapper mt-4'>
                <Outlet />
            </div>
            
        </>
    )
}