import { useInfiniteQuery } from "react-query"
import { ObjectToArray } from "../../utils"
import queryKeyFactory from "../queryKeyFactory"
import { map } from 'lodash'
import { EventApi } from "../../apis"

export const filters = ObjectToArray({
    'active': 'Home',
    'interested': 'Interested',
    'hosting': 'Hosting',
    'going': 'Going',
    'past': 'Past Events',
})

export default function useEventsQuery(filter) {

    return useInfiniteQuery({
        queryKey: queryKeyFactory.events(filter),
        enabled: filters.some(({ key }) => key === filter),
        queryFn: ({ pageParam = 1 }) => EventApi.fetchEvents(pageParam, filter),
        getNextPageParam: (lastPage) => {
            if (lastPage.next_page_url) {
                return lastPage.current_page + 1
            }
            return undefined
        },
        select: ({ pages }) => {
            return map(pages, 'data').flat()
        },
    }
    )
}