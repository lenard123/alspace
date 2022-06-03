import { useQuery, useQueryClient } from "react-query"
import { fetchCurrentUser } from "../../apis/AuthApi"
import useUserMutator from "../mutators/useUserMutator"
import queryKeyFactory from "../queryKeyFactory"
import _ from 'lodash'

const useCurrentUserQuery = () => {
    const queryClient = useQueryClient()
    const { updateUser } = useUserMutator()
    return useQuery(queryKeyFactory.currentUser, fetchCurrentUser, {
        retry: 0,
        staleTime: 1000 * 60 * 60 * 2,
        onSuccess(user){
            if (user) {
                const userInfo = queryClient.getQueryData(queryKeyFactory.user(user.id))
                if (userInfo) {
                    updateUser(user.id, _.merge(userInfo, user))
                }
            }
        },
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