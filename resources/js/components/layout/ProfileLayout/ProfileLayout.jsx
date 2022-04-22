import { Avatar, Button, Image, Tabs } from "antd";
import { Outlet } from "react-router";
import Helmet from 'react-helmet'
import { useState } from 'react'
import SkeletonLayout from "./SkeletonLayout";

export default function ProfileLayout() 
{

    // const [title, setTitle] = useState('Profile')

    // if (true) return <SkeletonLayout />

    return (
        <>
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
                                src='https://avatars.dicebear.com/api/initials/lenard+mangay-ayam.svg'
                                size={120}
                            />

                            <div className='sm:pb-2 flex flex-col sm:flex-row justify-between flex-grow gap-2'>
                                <div className='text-2xl md:text-3xl text-center font-bold text-gray-800'>Lenard Mangay-ayam</div>
                                <div className='flex sm:self-end justify-center'>
                                    <Button size='large' type='secondary' shape='round'>Send Message</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Tabs size='large' tabBarStyle={{marginBottom: 0}}>
                        <Tabs.TabPane key={1} tab={'Posts'} />
                        <Tabs.TabPane key={2} tab='About' />
                        <Tabs.TabPane key={3} tab='Jobs' />
                    </Tabs>

                </div>
            </div>

            <div className='page-wrapper mt-4'>
                <Outlet />
            </div>
            
        </>
    )
}