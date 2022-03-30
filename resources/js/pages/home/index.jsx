import { useState, useEffect } from 'react'
import WritePost from '@/js/components/WritePost'
import PostsList from '@/js/components/PostsList'
import useApi from '@/js/hooks/useApi'
import { fetchPosts } from '@/js/apis/PostApi'
import { useRecoilValue } from 'recoil'
import feedState from '@/js/recoil/states/feedState'
import useFeedActions from '@/js/recoil/actions/useFeedActions'
import feedPostsSelector from '@/js/recoil/selectors/feedPostsSelector'

export default function Home() {

    const [initLoading, setInitLoading] = useState(false)
    const { current_page, next_page_url } = useRecoilValue(feedState)
    const { setFeed } = useFeedActions()
    const { isLoading, execute, data:postsData, status } = useApi(fetchPosts)
    const posts = useRecoilValue(feedPostsSelector)
    const hasNext = !!next_page_url

    useEffect(() => {
        if (status === 'success') {
            setFeed(postsData)
        }
    }, [status])

    useEffect(() => {
        if (current_page === 0) {
            setInitLoading(true)
            execute().then(() => {
                setInitLoading(false)
            })
        }
    }, [])

    const seeMore = () => {
        execute(current_page + 1)
    }

    return (
        <div className='max-w-xl mx-auto sm:pt-4 pb-4'>

            <WritePost />

            <PostsList 
                initLoading={initLoading} 
                isLoading={isLoading} 
                posts={posts}
                hasNext={hasNext}
                seeMore={seeMore}
            />

        </div>

    )
}