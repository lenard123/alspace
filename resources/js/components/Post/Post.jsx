import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Spin } from 'antd'
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons'
import { useToggler, sleep } from '@/js/hooks'
import moment from 'moment'
import useUser from '@/js/recoil/selectors/useUser'

export default function ({ post, children }) 
{
    const author = useUser(post.user_id)
    const [isLike, toggleLike] = useToggler(false)
    const [liking, toggleLiking] = useState(false)

    const likePost = async (e) => {
        //Prevent Click spamming
        if (liking) return

        toggleLiking(true)
        await sleep(1500)
        toggleLiking(false)
        toggleLike()
    }

    return (
        <div className='flex flex-col w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>
                
            <div className='flex gap-2 items-center'>
                <Avatar size='large' src={author.avatarUrl} />
                <div className='flex justify-between'>
                    <div className='flex flex-col leading-3'>
                        <span className='font-bold'>{ author.fullname }</span>
                        <span className='text-sm'>{ moment(post.created_at).fromNow() }</span>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                { post.content }
            </div>

            <div>
                1 Like
            </div>

            <div className='flex gap-2 text-lg py-1 border-t border-gray-300'>
                <button onClick={likePost} className='cursor-pointer flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'>
                    <Spin spinning={liking}>
                        {isLike 
                            ? <LikeFilled className='text-blue-500'/> 
                            : <LikeOutlined />
                        }
                    </Spin>
                </button>
                <Link to='/posts/1' className='flex-grow py-1 text-center bg-white hover:bg-gray-100 rounded-full'><CommentOutlined /></Link>
            </div>

            {
                !!children && (
                    <div className='mt-1 mb-4 border-t border-gray-300'>
                        { children }
                    </div>
                )
            }

        </div>
    )
}