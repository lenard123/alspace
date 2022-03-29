import { atom } from "recoil";


const usersState = atom({
    key: 'users',
    default: {}
})

export default usersState