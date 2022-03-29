import { useSetRecoilState } from "recoil"
import usersState from "../states/usersState"
import { keyBy } from 'lodash'

const useUsersAction = () => {
    const setUsersState = useSetRecoilState(usersState)

    const setUsers = (users) => {
        setUsersState(oldData => {
            const newData = keyBy(users, 'id')
            return {
                ...oldData,
                ...newData
            }
        })
    }

    const setUser = (user) => setUsers([user])

    return {
        setUsers,
        setUser
    }
}

export default useUsersAction