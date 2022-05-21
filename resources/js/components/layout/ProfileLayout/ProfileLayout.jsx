import { Avatar, Button, Card, Image, Tabs, Typography } from "antd";
import { Outlet, useParams } from "react-router";
import Helmet from 'react-helmet'
import SkeletonLayout from "./SkeletonLayout";
import useUserQuery from "@/js/query/queries/useUserQuery";
import { useIsCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import useTabs from "./useTabs";
import { Link } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";
import ProfileRoutes from "./components/ProfileRoutes";
import ProfileAvatar from "./components/ProfileAvatar";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import ProfileCover from "./components/ProfileCover";

export default function ProfileLayout() {
    const { id } = useParams()
    const isCurrentUser = useIsCurrentUser(id)
    const { isLoading, data: user } = useUserQuery(id)
    const { tabs, active } = useTabs(id)

    if (isLoading) return <SkeletonLayout />

    const { fullname, avatarUrl, created_at, info, alumnus } = user
    const { cover_url, bio } = info
    return (
        <>
            <Helmet>
                <title>{fullname}</title>
            </Helmet>

            <div className='bg-white border-b border-gray-300'>
                <ProfileCover src={cover_url} showEditButton={isCurrentUser}/>

                <div className='page-wrapper px-4'>
                    <div className='-mt-[60px]'>
                        <div className='flex flex-col items-center sm:flex-row sm:items-end gap-2'>

                            <ProfileAvatar src={avatarUrl} showEditButton={isCurrentUser} />

                            <div className='sm:pb-2 flex flex-col sm:flex-row justify-between flex-grow gap-2'>
                                <div className='text-2xl md:text-3xl text-center font-bold text-gray-800'>{fullname}</div>
                                <div className='flex sm:self-end justify-center'>
                                    {isCurrentUser
                                        ? <Link to={`/profile/${id}/edit`}><Button size='large' type='secondary' shape='round'>Edit Profile</Button></Link>
                                        : <Link to={`/messages?user_id=${id}`}><Button size='large' type='secondary' shape='round'>Send Message</Button></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultActiveKey={active} size='large' tabBarStyle={{ marginBottom: 0 }}>
                        {tabs.map(({ title, link }) => (
                            <Tabs.TabPane key={link} tabKey={title} tab={<Link to={link}>{title}</Link>} />
                        ))}
                    </Tabs>

                </div>
            </div>

            <div className='page-wrapper my-4'>
                <div className='flex gap-4'>
                    <ProfileCard
                        bio={bio}
                        joined={created_at}
                        alumnus={alumnus}
                    />

                    <div className='w-full'>
                        <ProfileRoutes context={{ id, isCurrentUser, user }} />
                    </div>
                </div>
            </div>

        </>
    )
}