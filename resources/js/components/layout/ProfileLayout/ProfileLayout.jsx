import { Avatar, Button, Card, Image, Tabs, Typography } from "antd";
import { Outlet, useParams } from "react-router";
import Helmet from 'react-helmet'
import SkeletonLayout from "./SkeletonLayout";
import useUserQuery from "@/js/query/queries/useUserQuery";
import { useIsCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import useTabs from "./useTabs";
import { Link } from "react-router-dom";

export default function ProfileLayout() {
    const { id } = useParams()
    const isCurrentUser = useIsCurrentUser(id)
    const { isLoading, data: user } = useUserQuery(id)
    const { tabs, active } = useTabs(id)

    if (isLoading) return <SkeletonLayout />

    const { fullname, avatarUrl, cover, created_at } = user

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
                    src={cover.url}
                />

                <div className='page-wrapper px-4'>
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
                                    {isCurrentUser
                                        ? <Button size='large' type='secondary' shape='round'>Edit Profile</Button>
                                        : <Link to={`/messages?user_id=${id}`}><Button size='large' type='secondary' shape='round'>Send Message</Button></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultActiveKey={active} size='large' tabBarStyle={{ marginBottom: 0 }}>
                        {tabs.map(({ title, link }) => (
                            <Tabs.TabPane key={title} tabKey={title} tab={<Link to={link}>{title}</Link>} />
                        ))}
                    </Tabs>

                </div>
            </div>

            <div className='page-wrapper my-4'>
                <div className='flex gap-4'>
                    <Card className='w-2/5 self-start mt-3 shadow-lg'>
                        <Typography.Title level={4}>Bio</Typography.Title>
                        {false
                            ? <Typography.Paragraph>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum obcaecati similique, tempora harum architecto est iusto ut ea ipsam numquam. Sunt dignissimos, voluptatem reprehenderit et nam eaque corporis dicta rem!
                            </Typography.Paragraph>
                            : <Typography.Text type='secondary' italic>No bio set</Typography.Text>
                        }


                        <Typography.Title level={4}>Joined</Typography.Title>
                        <Typography.Text>{(new Date(created_at)).toLocaleDateString()}</Typography.Text>
                    </Card>
                    <div className='w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}