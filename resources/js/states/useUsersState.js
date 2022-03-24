import { atom, useRecoilState } from "recoil";

export const usersState = atom({
    key: 'users',
    default: {}
})

const useUsersState = () => {
    const [users, setUsers] = useRecoilState(usersState)

    const dispatch = (type, payload) => {
        setUsers(users => {
            switch(type) {
                case 'SET_USER':
                    const { user } = payload
                    return {...users, [user.id]: user}
            }
            return users
        })
    }

    return {
        dispatch,
        users
    }
}

export const useUser = (userId) => {
    const { users, dispatch } = useUsersState()
    const user = users[userId]

    return {
        user,
        dispatch
    }
}

export default useUsersState