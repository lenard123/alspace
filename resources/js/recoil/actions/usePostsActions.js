import { arrayKeyBy, arrayPluck } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import postsState from "../states/postsState"
import usePostsCommentIdsAction from "./usePostsCommentIdsActions"
import usePostsLikerIdsActions from "./usePostsLikerIdsActions"
import useUsersAction from "./useUsersAction"

const compact = (posts) => {
    return posts.map(({likerIds, comments, author, ...post}) => post)
}

const usePostsActions = () => {
    const setPostsState = useSetRecoilState(postsState)
    const { setPostsLikerIds } = usePostsLikerIdsActions()
    const { setPostsCommentIds } = usePostsCommentIdsAction()
    const { setUsers } = useUsersAction()

    const setPosts = (posts) => {
        setUsers(arrayPluck(posts, 'author'))
        setPostsLikerIds(posts)
        setPostsCommentIds(posts)

        setPostsState(oldPosts => {
            return {...oldPosts, ...arrayKeyBy(compact(posts), 'id')}
        })
    }

    const setPost = post => setPosts([post])

    return { setPosts, setPost }

}

export default usePostsActions