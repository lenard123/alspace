import { useEffect } from 'react'
import { useQuery } from 'react-query'

export default function AvailableTShirt()
{
    const { data } = useQuery({
        queryKey: ['tshirts', 'available']
    })
    useEffect(() => {
        console.log('mounted')
    }, [])

    return 'Available Shirt'
}