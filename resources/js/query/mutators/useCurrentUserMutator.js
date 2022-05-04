import { useQueryClient } from "react-query"
import queryKeyFactory from "../queryKeyFactory"


export default function useCurrentUserMutator()
{
    const queryClient = useQueryClient()

    const updateUnreadThreadCount = (unread_thread_count) => {
        queryClient.setQueryData(queryKeyFactory.currentUser, function (user){
            return {
                ...user,
                unread_thread_count 
            }
        });
    }

    return {
        updateUnreadThreadCount
    }
}