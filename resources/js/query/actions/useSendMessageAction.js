import uuid from 'react-uuid'
import { ThreadApi } from "@/js/apis"
import { prependPagination, updatePagination } from "@/js/utils/paginationReducer"
import { useMutation, useQueryClient } from "react-query"
import queryKeyFactory from "../queryKeyFactory"
import { useCurrentUser } from '../queries/useCurrentUserQuery'
import { message } from 'antd'


export default function useSendMessageAction()
{
    const queryClient = useQueryClient()
    const { id: user_id } = useCurrentUser()

    return useMutation(
        ({ id, content }) => ThreadApi.sendMessage(id, content), 
        {
            async onMutate({ id, content }) {
                await queryClient.cancelQueries(queryKeyFactory.threadMessages(id))

                const previous = queryClient.getQueryData(queryKeyFactory.threadMessages(id))
                const message_uuid = uuid()

                queryClient.setQueryData(
                    queryKeyFactory.threadMessages(id),
                    prependPagination({
                        id: message_uuid,
                        content,
                        user_id,
                        thread_id: id,
                        is_sending: 1
                    })
                )
                
                return { previous, message_uuid }
            },
            onError(error, variables, context)
            {
                message.error('Message failed to send')
                queryClient.setQueryData(queryKeyFactory.threadMessages(variables), context.previous)
            },
            onSuccess(data, {id}, context) {
                queryClient.setQueryData(queryKeyFactory.threadMessages(id), updatePagination(function (old) {
                   if (old.id === context.message_uuid) {
                       return data
                   }
                   return old
                }))
            }
        }
    )
}