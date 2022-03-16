import Post from '/src/components/Post/Post'
import Comment from '/src/components/Comment/Comment'

export default function()
{
    return (
        <div className='my-4 max-w-xl mx-auto'>
            <Post>
                <Comment />
                <Comment />
                <Comment />
            </Post>
        </div>
    )
}