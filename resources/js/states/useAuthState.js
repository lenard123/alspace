import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useUsersState, { usersState } from './useUsersState';

export const userIdState = atom({
    key: 'auth.userId',
    default: null
})

export const isValidatedState = atom({
    key: 'auth.isValidated',
    default: false
})

export const isAuthenticatedState = atom({
    key: 'auth.isAuthenticated',
    default: JSON.parse(localStorage.getItem('authenticated'))
})

export const currentUserState = selector({
    key: 'auth.user',
    get: ({get}) => {
        const userId = get(userIdState)
        const users = get(usersState)
        return users[userId]
    }
})

const useAuthState = () => {
    const { dispatch:dispatchUser } = useUsersState()
    const currentUser = useRecoilValue(currentUserState)
    const setUserId = useSetRecoilState(userIdState)
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState)
    const [isValidated, setIsValidated] = useRecoilState(isValidatedState)

    const dispatch = (type, payload) => {
        switch (type) {
            case 'SET_USER':
                const { user } = payload
                dispatchUser('SET_USER', {user})
                setIsAuthenticated(true)
                setIsValidated(true)
                setUserId(user.id)
                localStorage.setItem('authenticated', true)
                break;
            case 'SET_AUTHENTICATED':
                const { isAuthenticated } = payload
                setIsAuthenticated(isAuthenticated)
                localStorage.setItem('authenticated', isAuthenticated)
                break;
            case 'LOGOUT':
                setIsAuthenticated(false)
                setIsValidated(false)
                localStorage.removeItem('authenticated')
                break;
        }
    }

    return {
        currentUser,
        isAuthenticated,
        isValidated,
        dispatch
    }
}

export default useAuthState