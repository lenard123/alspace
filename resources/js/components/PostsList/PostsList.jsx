import { arrayIsLoading } from "@/js/utils";
import { Button, List, Skeleton } from "antd";
import Post from "../Post";

export default function PostsList({ initLoading, isLoading, posts, seeMore, hasNext }) {
    return (
        <List
            loading={initLoading}
            dataSource={arrayIsLoading(posts, isLoading)}
            loadMore={
                !isLoading && (
                    <div className='text-center leading-8 mt-3 h-8'>
                        {hasNext
                            ? <Button onClick={seeMore}>See more</Button>
                            : <span>You reach the end.</span>
                        }
                    </div>
                )
            }
            renderItem={post => (
                <List.Item>
                    <Skeleton loading={post.isLoading} avatar active>
                        <Post post={post} />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}