import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useCurrentUser } from '../queries/useCurrentUserQuery'
import useMessagesAction from '../recoil/actions/useMessagesAction'
import authState from '../recoil/states/authState'
import Echo from '../utils/Echo'

const useCurrentUserEvents = () => {
    const { id:currentUserId} = useCurrentUser()
    const [connection, setConnection] = useState(null)
    const { appendMessage } = useMessagesAction()

    useEffect(() => {
        if (connection){
           //Attach Listener
           connection.listen('MessageReceived', ({ message }) => {
               console.log(message)
//               appendMessage(message)
           })
        }

    }, [connection])

    useEffect(() => {
        if (currentUserId) {
            console.log(`Listening to channel users.${currentUserId} and event: MessageReceived`)
            Echo.private(`users.${currentUserId}`).listen('MessageReceived', (payload) => {
                console.log(payload)
            })
        }

        return () => {
            console.log(`Leaving channel: users.${currentUserId}`)
            Echo.leaveChannel(`users.${currentUserId}`)
        }
    }, [currentUserId])
}

export default useCurrentUserEvents