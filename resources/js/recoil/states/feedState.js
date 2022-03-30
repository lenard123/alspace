import { atom } from "recoil"

const feedState = atom({
    key: 'feed',
    default: {
        current_page: 0,
        next_page_url: null,
        postIds: []
    }
})

export default feedState