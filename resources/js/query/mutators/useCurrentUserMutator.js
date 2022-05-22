import { useQueryClient } from "react-query"
import queryKeyFactory from "../queryKeyFactory"
import _ from 'lodash'

export default function useCurrentUserMutator()
{
    const queryClient = useQueryClient()

    const setCurrentUser = (newData) => {
        queryClient.setQueryData(queryKeyFactory.currentUser, newData)
    }

    const updateUnreadThreadCount = (unread_thread_count) => {
        setCurrentUser(user => _.merge(user, {unread_thread_count}))
    }

    const setAvatar = (avatarUrl) => {
        setCurrentUser(user => _.merge(user, {avatarUrl}))
    }

    const updateInfo = (info) => {
        setCurrentUser(user => _.merge(user, {info}))
    }

    const setCover = (cover_url) => {
        updateInfo({cover_url})
    }

    return {
        setCurrentUser,
        updateUnreadThreadCount,
        setAvatar,
        setCover,
        updateInfo,
    }
}