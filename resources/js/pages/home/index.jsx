import Post from '@/js/components/Post/Post'
import WritePost from '@/js/components/WritePost'

export default function() {
    return (
        <div className='max-w-xl mx-auto sm:pt-4'>

            <WritePost />

            <div className='my-4 flex flex-col gap-4 max-w-xl mx-auto'>
                <Post />
                <Post />
                <Post />
            </div>

        </div>

    )
}