import useEventsQuery from "@/js/queries/useEventsQuery";
import { Empty } from "antd";
import EventCard from "./EventCard";
import EventSkeletonCard from "./EventSkeletonCard";

const skeletonList = (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 3 }).map(
            (_el, i) => <EventSkeletonCard key={i} />
        )}
    </div>
)

export default function EventList({ filter }) {

    const { data: events, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useEventsQuery(filter)

    //Display loading
    if (!events || isLoading) return skeletonList;

    //Display empty
    if (events.length <= 0) return <Empty className='py-8' description="No events" />;

    return (
        <>
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {events.map(
                    event => <EventCard key={event.id} event={event} />
                )}
            </div>

            {hasNextPage &&
                <Button loading={isFetchingNextPage} onClick={fetchNextPage} className='mx-auto mt-8 block'>Load more</Button>
            }
        </>
    )
}