import { useRecoilValue } from "recoil"
import threadsState from "../states/threadsState"

const useThread = (id) => {
    const threads = useRecoilValue(threadsState)
    return threads[id]
}

export default useThread