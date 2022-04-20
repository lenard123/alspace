import { FileWordOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Divider, Image, Tabs } from "antd";
import useTab from './useTab'
import { useEffect } from 'react'
import EventDetailsPageAbout from "./EventDetailsPageAbout";
import EventDetailsPageParticipants from "./EventDetailsPageParticipants";

export default function EventDetailsPage() {

    const [ active, setActive ] = useTab()
    
    return (
        <>
            <div>
                <Image
                    width='100%'
                    height='min(300px, 60vw)'
                    className='object-cover'
                    preview={false}
                    src="https://res.cloudinary.com/djasbri35/image/upload/v1649750499/alspace/events/elswo9xz2hx6htjaoxng.jpg"
                />
            </div>

            <div className='bg-white pt-2 border-b border-gray-300'>
                <div className='page-wrapper'>
                    <div className='font-bold text-lg text-rose-500'>TUESDAY, MAY 10, 2022 AT 6:30 PM UTC+08</div>
                    <div className='font-bold text-3xl text-gray-900'>Web Development Seminar</div>
                    <div>Online</div>

                    {/* <Divider className='my-2'/> */}

                    <Tabs onChange={setActive} defaultActiveKey={active} size='large' tabBarStyle={{margin: 0}}>
                        <Tabs.TabPane key='about' tab='About'/>
                        <Tabs.TabPane key='interested' tab='Interested'/>
                        <Tabs.TabPane key='going' tab='Going'/>
                    </Tabs>

                </div>
            </div>

            {active === 'about'  
                ? <EventDetailsPageAbout /> 
                : <EventDetailsPageParticipants type={active} />
            }
        </>
    )
}