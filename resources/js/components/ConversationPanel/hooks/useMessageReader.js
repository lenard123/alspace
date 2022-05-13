import useReadMessageAction from '@/js/query/actions/useReadMessageAction'
import { useEffect } from 'react'

export default function useMessageReader(message, isOwn)
{
    const { mutate } = useReadMessageAction()

    useEffect(() => {
        if (isOwn) return;
        if (message.has_read) return;
        mutate(message.id)
    }, [])
}