import { useQuery, useQueryClient } from "react-query"
import { fetchCurrentUser } from "../apis/AuthApi"

const useCurrentUserQuery = () => {
    const queryClient = useQueryClient()
    return useQuery(['users', 'current'], fetchCurrentUser, {
        retry: 0,
        staleTime: 1000 * 60 * 60 * 2,
        onError: (error) => {
            if (error?.response.status === 401) {
                queryClient.setQueryData(['users', 'current'], null)
            }
        }
    })

}

export const useCurrentUser = () => {
    const { data } = useCurrentUserQuery()
    return data
}

export default useCurrentUserQuery