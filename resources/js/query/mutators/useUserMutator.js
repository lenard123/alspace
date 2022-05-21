import { useQueryClient } from "react-query"
import queryKeyFactory from "../queryKeyFactory"


export default function useUserMutator()
{
    const queryClient = useQueryClient()

    const updateUser = (id, newData) => {
        queryClient.setQueryData(queryKeyFactory.user(id), newData)
    }

    return {
        updateUser
    }
}