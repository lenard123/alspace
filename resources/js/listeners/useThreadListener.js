import { useState, useEffect } from 'react'
import useMessagesAction from '../recoil/actions/useMessagesAction'
import Echo from '../utils/Echo'

const useThreadListener = (id) => {
    const [connection, setConnection] = useState(null)
    const { appendMessage } = useMessagesAction()

    useEffect(() => {
        connection?.listen('MessageReceived', ({message}) => {
            appendMessage(message)
        })

        return () => {
            connection?.stopListening('MessageReceived')
        }
    }, [connection])

    useEffect(() => {
        setConnection(Echo.private(`thread.${id}`))
    }, [id])

}

export default useThreadListener