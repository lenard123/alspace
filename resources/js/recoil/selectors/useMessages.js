import { useRecoilValue } from "recoil"
import messagesState from "../states/messagesState"

const useMessages = (threadId) => {
    const messages = useRecoilValue(messagesState)
    return messages[threadId] || []
}

export default useMessages