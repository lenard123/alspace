import { useQuery, useQueryClient } from "react-query"
import { fetchCurrentUser } from "../apis/AuthApi"
import queryKeyFactory from "./queryKeyFactory"

const useCurrentUserQuery = () => {
    const queryClient = useQueryClient()
    return useQuery(queryKeyFactory.currentUser, fetchCurrentUser, {
        retry: 0,
        staleTime: 1000 * 60 * 60 * 2,
        onError: (error) => {
            if (error?.response.status === 401) {
                queryClient.setQueryData(queryKeyFactory.currentUser, null)
            }
        },
        initialData: window.user
    })

}

export const useCurrentUser = () => {
    const { data } = useCurrentUserQuery()
    return data
}

export const useIsCurrentUser = (userId) => {
    const { id } = useCurrentUser()
    return userId == id
}

export default useCurrentUserQuery