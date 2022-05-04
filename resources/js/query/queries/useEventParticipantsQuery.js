import { useQuery } from "react-query";
import { EventApi } from "../../apis";
import queryKeyFactory from "../queryKeyFactory";



export default function useEventParticipantsQuery(eventId, type)
{
    return useQuery({
        queryKey: queryKeyFactory.eventParticipants(eventId, type),
        queryFn: () => EventApi.fetchEventParticipants(eventId, type)
    })
}