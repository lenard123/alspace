import { useSetRecoilState } from "recoil"
import messagesState from "../states/messagesState"
import { values, keyBy } from 'lodash'

const useMessagesAction = () => {
    const setMessagesState = useSetRecoilState(messagesState)

    const setMessages = ({id, messages, ...thread}) => {
        setMessagesState(old => {
            const oldMessages = old[id] || []
            return {
                ...old,
                [id]: values( {
                    ...keyBy(oldMessages, 'id'), 
                    ...keyBy(messages, 'id') 
                })
            }
        })
    }

    const appendMessage = (message) => {
        setMessagesState(old => {
            const id = message.thread_id
            const oldMessages = old[id] || []
            return {
                ...old,
                [id]: [...oldMessages, message]
            }
        })
    }

    return {
        setMessages,
        appendMessage
    }

}

export default useMessagesAction