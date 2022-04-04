import { useState, useEffect } from 'react'
import Echo from '../utils/Echo'

const useThreadListener = (id) => {
    const [connection, setConnection] = useState(null)

    useEffect(() => {
        if (connection) {
            connection.listen('NewMessageReceived')
        }
    }, [connection])

    useEffect(() => {
        setConnection(Echo.private(`thread.${id}`))
    }, [id])

}