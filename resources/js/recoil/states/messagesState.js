import { atom } from "recoil";

const messagesState = atom({
    key: 'messages',
    default: {}
})

export default messagesState