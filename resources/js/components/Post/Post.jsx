import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import moment from 'moment'
import useUser from '@/js/recoil/selectors/useUser'
import LikeButton from './components/LikeButton'
import { usePostLikeCount } from '@/js/recoil/selectors/usePost'
import Options from './components/Options'
import usePostLogic from './usePostLogic'

export default function Post({ post, children, onDelete }) 
{
    const author = useUser(post.user_id)
    const likeCount = usePostLikeCount(post.id)
    const comments_count = post.comments_count
    const { isBelongsToUser, showDeleteModal } = usePostLogic(post, onDelete)

    return (
        <div className='flex flex-col w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>
                
            <div className='flex gap-2 items-center'>
                <Avatar size='large' src={author.avatarUrl} />
                <div className='flex flex-grow justify-between'>
                    <div className='flex flex-col leading-3'>
                        <span className='font-bold'>{ author.fullname }</span>
                        <span className='text-sm'>{ moment(post.created_at).fromNow() }</span>
                    </div>
                    <Options isBelongsToUser={isBelongsToUser} showDeleteModal={showDeleteModal}/>
                </div>
            </div>

            <div className='my-4 text-base'>
                { post.content }
            </div>

            <div className='text-xs flex justify-between py-1'>
                <span>{ likeCount > 0 && `${likeCount} ${likeCount > 1 ? 'Likes' : 'Like'}` }</span>
                <span>{ comments_count > 0 && `${comments_count} ${comments_count > 1 ? 'Comments' : 'Comment'}` }</span>
            </div>

            <div className='flex gap-2 text-lg py-1 border-t border-gray-300'>
                <LikeButton id={post.id}/>
                <Link to={`/posts/${post.id}`} className='flex-grow py-1 text-center bg-white hover:bg-gray-100 rounded-full'><CommentOutlined /></Link>
            </div>

            {
                !!children && (
                    <div className='my-1 border-t border-gray-300'>
                        { children }
                    </div>
                )
            }

        </div>
    )
}