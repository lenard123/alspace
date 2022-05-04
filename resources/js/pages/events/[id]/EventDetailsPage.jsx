import { Image, Skeleton, Tabs } from "antd";
import useTab from './useTab'
import EventDetailsPageAbout from "./EventDetailsPageAbout";
import EventDetailsPageParticipants from "./EventDetailsPageParticipants";
import useEventQuery from "@/js/query/useEventQuery";
import { useParams } from "react-router";
import { fallbackImage } from "@/js/utils";
import useDates from "@/js/hooks/useDates";

export default function EventDetailsPage() {

    const { id } = useParams()
    const [ active, setActive ] = useTab()
    const { isLoading, data: event } = useEventQuery(id)
    const { formattedFull } = useDates(event?.start_at)
    
    if (isLoading) {
        return (
            <>
                <Skeleton.Image className='block' style={{width:'100%', height:'min(300px, 60vw)'}}/>
                <div className='page-wrapper pt-2'>
                    <Skeleton 
                        loading 
                        title={{width: 300}}
                        active
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <Image
                    width='100%'
                    height='min(300px, 60vw)'
                    className='object-cover'
                    src={event.cover?.url || fallbackImage}
                    fallback={fallbackImage}
                />
            </div>

            <div className='bg-white pt-2 border-b border-gray-300'>
                <div className='page-wrapper px-4'>
                    <div className='font-bold text-lg text-rose-500 uppercase'>{ formattedFull }</div>
                    <div className='font-bold text-3xl text-gray-900'>{ event.title }</div>
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
                ? <EventDetailsPageAbout event={event}/> 
                : <EventDetailsPageParticipants type={active} id={id}/>
            }
        </>
    )
}