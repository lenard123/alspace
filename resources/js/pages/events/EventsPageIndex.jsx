import { EditOutlined } from "@ant-design/icons"
import { Button, List, Skeleton, Spin } from "antd"
import { Helmet } from 'react-helmet'
import AddEventModal from "./components/AddEventModal"
import { useState } from 'react'
import useCurrentFilter from "./useCurrentFilter"
import FilterLink from "./components/FilterLink"
import EventCard from "./components/EventCard"
import useEventQuery, { filters } from "@/js/queries/useEventQuery"
import EventList from "./components/EventList"


export default function EventsPageIndex() {
    const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false)
    const filter = useCurrentFilter()
    const { data: events, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useEventQuery(filter)

    return (
        <>
            <Helmet>
                <title>Events</title>
            </Helmet>
            <div className='lg:p-4'>
                <div className='bg-white border border-gray-200 lg:rounded-lg flex-grow w-full h-full max-w-5xl mx-auto p-6'>
                    <div className='flex justify-between'>
                        <div className="font-bold text-xl sm:text-2xl text-gray-700">Events</div>
                        <Button onClick={() => setIsAddEventModalVisible(true)} type='text' shape='circle' icon={<EditOutlined />} />
                    </div>
                    <div className="mt-4 flex gap-2 overflow-x-auto">
                        {filters.map(({ key, value }) => (
                            <FilterLink key={key} filter={key}>{value}</FilterLink>
                        ))}
                    </div>

                    <EventList
                        isLoading={isLoading}
                        events={events}
                    />

                    {hasNextPage && 
                        <Button loading={isFetchingNextPage} onClick={fetchNextPage} className='mx-auto mt-8 block'>Load more</Button>
                    }

                </div>
            </div>
            <AddEventModal
                visible={isAddEventModalVisible}
                onCancel={() => setIsAddEventModalVisible(false)}
            />
        </>
    )
}