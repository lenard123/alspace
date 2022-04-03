import { arrayDropKeys, arrayKeyBy } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import threadsState from "../states/threadsState"
import useMessagesAction from "./useMessagesAction"


const useThreadsAction = () => {

    const setThreadsState = useSetRecoilState(threadsState)
    const { setMessages } = useMessagesAction()

    const setThreads = (threads) => {
        setThreadsState(old => {
            const [compactThread] = arrayDropKeys(threads, 'messages') 
            return {
                ...old,
                ...arrayKeyBy(compactThread, 'id')
            }
        })
    }

    const setThread = (thread) => {
        setMessages(thread)
        setThreads([thread])
    }

    return {
        setThreads,
        setThread
    }

}

export default useThreadsAction