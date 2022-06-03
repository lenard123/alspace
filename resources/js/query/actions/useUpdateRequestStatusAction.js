import { successMessage } from '@/js/utils'
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { useMutation, useQueryClient } from 'react-query'

const apiUpdateStatus = async (id, status) => {
    await requestCookie()
    return await Http.post(`/items/requests/${id}`, {
        status,
        _method: 'PATCH'
    })
}


export default function useUpdateRequestStatusAction(record)
{
    const queryClient = useQueryClient()

    return useMutation((status) => apiUpdateStatus(record.id, status), {
        onSuccess() {
            successMessage('Status updated successfully')
            queryClient.invalidateQueries(['items', 'requests'])
        },
        onError: handleError
    })
}