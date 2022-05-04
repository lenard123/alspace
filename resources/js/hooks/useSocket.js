import { useCurrentUser } from "../query/queries/useCurrentUserQuery"
import { Echo } from "../utils"
import { useEffect, useCallback } from 'react'

function listen(callback, channel, event) {
    Echo.private(channel).listen(event, (payload) => {
        callback(payload)
    })

    return function cleanUp() {
        Echo.leaveChannel(`private-${channel}`)
    }
}

const useSocket = ({ event, callback }) => {
    const { id } = useCurrentUser()

    useEffect(() => {
        switch (event) {
            case 'MESSAGE_RECEIVED':
                return listen(callback, `users.${id}`, 'MessageReceived')
        }
    }, [])
}

export default useSocket