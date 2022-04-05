import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import useMessagesAction from '../recoil/actions/useMessagesAction'
import authState from '../recoil/states/authState'
import Echo from '../utils/Echo'

const useCurrentUserEvents = () => {
    const { currentUserId } = useRecoilValue(authState)
    const [connection, setConnection] = useState(null)
    const { appendMessage } = useMessagesAction()

    useEffect(() => {
        if (connection){
           //Attach Listener
           connection.listen('MessageReceived', ({ message }) => {
               appendMessage(message)
           })
        }

    }, [connection])

    useEffect(() => {
        if (currentUserId) {
            setConnection(Echo.private(`users.${currentUserId}`))
        }

        return () => {
            setConnection(false)
        }
    }, [currentUserId])
}

export default useCurrentUserEvents