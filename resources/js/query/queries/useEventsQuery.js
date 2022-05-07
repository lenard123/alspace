import { useInfiniteQuery, useQuery } from "react-query"
import { mapDate, ObjectToArray } from "../../utils"
import queryKeyFactory from "../queryKeyFactory"
import { map } from 'lodash'
import { EventApi } from "../../apis"
import { paginationDataReducer } from "../ReactQueryProvider"
import moment from "moment"

const validFilters = ['active', 'interested', 'hosting', 'going', 'past', 'cancelled', 'pending']

export const filters = ObjectToArray({
    'active': 'Upcoming Events',
    'interested': 'Interested',
    'hosting': 'Hosting',
    'going': 'Going',
    'past': 'Past Events',
})


export  function useEventsInfiniteQuery(filter) {
    return useInfiniteQuery({
        queryKey: queryKeyFactory.events({filter}),
        enabled: validFilters.includes(filter),
        queryFn: ({ pageParam = 1 }) => EventApi.fetchEvents(pageParam, filter),
        select: paginationDataReducer,
    })
}

export default function useEventsQuery(filter, page = 1) {
    return useQuery({
        queryKey: queryKeyFactory.events({filter, page}),
        enabled: validFilters.includes(filter),
        queryFn: () => EventApi.fetchEvents(page, filter),
        select: ({ data, ...fullData }) => {
            return {
                ...fullData,
                data: mapDate(data, 'start_at')
            }
        }
    })
}