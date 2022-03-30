import { arrayKeyBy, arrayPluck } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import postsState from "../states/postsState"
import useUsersAction from "./useUsersAction"

const compact = (posts) => {
    return posts.map(({author, ...post}) => post)
}

const usePostsActions = () => {
    const setPostsState = useSetRecoilState(postsState)
    const { setUsers } = useUsersAction()

    const setPosts = (posts) => {
        setUsers(arrayPluck(posts, 'author'))

        setPostsState(oldPosts => {
            return {...oldPosts, ...arrayKeyBy(compact(posts), 'id')}
        })
    }

    const setPost = post => setPosts([post])

    return { setPosts, setPost }

}

export default usePostsActions