import useUserPostsQuery from "@/js/query/queries/useUserPostsQuery";
import { useParams } from "react-router";
import { List } from "antd"
import Post from "@/js/components/Post";
import WritePost from "@/js/components/WritePost";
import { useIsCurrentUser } from "@/js/query/queries/useCurrentUserQuery";

export default function ProfilePage() 
{
    const { id } = useParams()
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useUserPostsQuery(id)
    const isCurrentUser = useIsCurrentUser(id)

    return (
        <>
            <List
                className='max-w-xl'
                header={isCurrentUser && <WritePost/>}
                dataSource={data}
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
    );
}