import { Empty } from "antd";
import EventCard from "./EventCard";
import EventSkeletonCard from "./EventSkeletonCard";

export default function EventList({ isLoading, events }) {

    if (isLoading) {
        return (
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {Array.from({ length: 3 }).map(
                    (_el, i) => <EventSkeletonCard key={i} />   
                )}
            </div>
        )
    }

    if (events?.length <= 0) {
        return (
            <Empty className='py-8' description="No events" />
        )
    }

    return (
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {events.map(
                event => <EventCard key={event.id} event={event} />
            )}
        </div>
    )
}