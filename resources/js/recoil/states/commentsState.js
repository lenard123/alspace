import { atom } from "recoil";

const commentsState = atom({
    key: 'comments',
    default: {}
})

export default commentsState