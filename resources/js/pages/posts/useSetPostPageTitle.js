import useSetTitle from "@/js/hooks/useSetTitle";
import usePost from "@/js/recoil/selectors/usePost";
import useUser from "@/js/recoil/selectors/useUser";
import { useEffect } from 'react'

export default function useSetPostPageTitle(postId)
{
    const post = usePost(postId)
    const author = useUser(post?.user_id)
    const setTitle = useSetTitle()

    useEffect(() => {
        if (author) {
            setTitle(author.fullname + '\'s Post')
        }
    }, [author])


}