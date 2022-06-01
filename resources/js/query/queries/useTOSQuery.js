import { useQuery } from "react-query";
import Http, { requestCookie } from '@/js/utils/Http'

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/tos')
}

export default function useTOSQuery(option = {})
{
    return useQuery({
        queryKey: ['tos'],
        queryFn: apiCall,
        ...option
    })
}