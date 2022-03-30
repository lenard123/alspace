import { useRecoilValue } from "recoil"
import usersState from "../states/usersState"

const useUser = (userId) => {
    const users = useRecoilValue(usersState)
    return users[userId]
}

export default useUser