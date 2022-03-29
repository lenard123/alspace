import { selector } from "recoil"
import authState from "../states/authState"
import usersState from "../states/usersState"

const currentUserSelector = selector({
    key: 'currentUser',
    get: ({get}) => {
        const users = get(usersState)
        const { currentUserId } = get(authState)
        return users[currentUserId]
    }
})

export default currentUserSelector