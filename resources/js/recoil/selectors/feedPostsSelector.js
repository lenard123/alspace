import { selector } from "recoil";
import feedState from "../states/feedState";
import postsState from "../states/postsState";

const feedPostsSelector = selector({
    key: 'feedPosts',
    get: ({get}) => {
        const { postIds } = get(feedState)
        const posts = get(postsState)
        return postIds.map(id => posts[id])
    }
})

export default feedPostsSelector