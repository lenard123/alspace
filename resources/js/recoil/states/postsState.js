import { atom } from "recoil";

const postsState = atom({
    key: 'posts',
    default: {}
})

export default postsState