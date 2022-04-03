import { atom } from "recoil";

const threadsState = atom({
    key: 'threads',
    default: {}
})

export default threadsState