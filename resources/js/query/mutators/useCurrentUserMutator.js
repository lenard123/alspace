import { useQueryClient } from "react-query"
import queryKeyFactory from "../queryKeyFactory"
import _ from 'lodash'

export default function useCurrentUserMutator()
{
    const queryClient = useQueryClient()

    const updateCurrentUser = (newData) => {
        queryClient.setQueryData(queryKeyFactory.currentUser, newData)
    }

    const updateUnreadThreadCount = (unread_thread_count) => {
        updateCurrentUser(user => _.merge(user, {unread_thread_count}))
    }

    const updateUnreadNotificationsCount = (unread_notifications_count) => {
        updateCurrentUser(user => _.merge(user, {unread_notifications_count}))
    }

    const updateAvatar = (avatarUrl) => {
        updateCurrentUser(user => _.merge(user, {avatarUrl}))
    }

    const updateInfo = (info) => {
        updateCurrentUser(user => _.merge(user, {info}))
    }

    return {
        updateUnreadThreadCount,
        updateUnreadNotificationsCount,
        updateAvatar,
        updateInfo,
    }
}