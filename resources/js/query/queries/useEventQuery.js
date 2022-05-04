import { useQuery } from "react-query";
import { EventApi } from "../../apis";
import queryKeyFactory from "../queryKeyFactory";


export default function useEventQuery(eventId) {
    return useQuery({
        queryKey: queryKeyFactory.event(eventId),
        queryFn: () => EventApi.fetchEvent(eventId),
        enabled: !!eventId
    })
}