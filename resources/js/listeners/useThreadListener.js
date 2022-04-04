import { useState, useEffect } from 'react'
import Echo from '../utils/Echo'

const useThreadListener = (id) => {
    const [connection, setConnection] = useState(null)

    useEffect(() => {
        connection?.listen('MessageReceived', ({message}) => {
            console.log(message)
        })

        return () => {
            connection?.stopListening('NewMessageReceived')
        }
    }, [connection])

    useEffect(() => {
        setConnection(Echo.private(`thread.${id}`))
    }, [id])

}

export default useThreadListener