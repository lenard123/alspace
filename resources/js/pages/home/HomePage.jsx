import WritePost from '@/js/components/WritePost'
import { Helmet } from 'react-helmet'
import useFeedQuery from '@/js/query/queries/useFeedQuery'
import { Button, List } from 'antd'
import Post from '@/js/components/Post'

export default function HomePage() {

    const { data, hasNextPage, isLoading, fetchNextPage, isFetchingNextPage } = useFeedQuery()

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <List
                className='max-w-xl mx-auto sm:pt-4 pb-4'
                dataSource={data}
                header={<WritePost />}
                loading={isLoading}
                loadMore={
                    <div className='text-center leading-8 mt-3 h-8'>
                        {
                            hasNextPage
                                ? <Button loading={isFetchingNextPage} disabled={isFetchingNextPage} onClick={fetchNextPage}>See more</Button>
                                : !isLoading && <span>You reach the end</span>
                        }
                    </div>
                }
                renderItem={post => (
                    <List.Item key={post.id}>
                        <Post post={post} />
                    </List.Item>
                )}
            />

        </>
    )
}