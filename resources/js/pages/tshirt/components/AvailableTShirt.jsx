import { useEffect } from 'react'
import { useQuery } from 'react-query'
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import LoadingPage from '../../alumni/components/LoadingPage'

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/items/tshirts/available')
}

export default function AvailableTShirt()
{
    const { data, isLoading } = useQuery({
        queryKey: ['tshirts', 'available'],
        queryFn: apiCall
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isLoading) return <LoadingPage />

    return 'Available Shirt'
}