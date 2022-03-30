import { arrayPluck } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import feedState from "../states/feedState"
import usePostsActions from "./usePostsActions"
import useUsersAction from "./useUsersAction"

const useFeedActions = () => {
    const setFeedState = useSetRecoilState(feedState)
    const { setPosts, setPost } = usePostsActions()

    const setFeed = ({ current_page, data, next_page_url }) => {
        setPosts(data)
        const postIds = arrayPluck(data, 'id')

        setFeedState(feed => ({
            current_page,
            next_page_url,
            postIds: [...feed.postIds, ...postIds]
        }))
    }

    const prependPost = (post) => {
        setPost(post)
        setFeedState(({postIds, ...feed}) => {
            return {
                ...feed,
                postIds: [post.id, ...postIds]
            }
        })
    }

    return { setFeed, prependPost }
}

export default useFeedActions