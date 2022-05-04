import { Link } from 'react-router-dom'
import { Avatar, Image } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import moment from 'moment'
import LikeButton from './components/LikeButton'
import Options from './components/Options'
import usePostLogic from './usePostLogic'
import { useState } from 'react'

export default function Post({ post, children, onDelete }) {
    const [previewVisible, setPreviewVisible] = useState(false)
    const { author, likers_count, comments_count, user_id } = post
    const { isBelongsToUser, showDeleteModal } = usePostLogic(post, onDelete)

    return (
        <div className='flex flex-col w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>

            <div className='flex gap-2 items-center'>
                <Avatar size='large' src={author.avatarUrl} />
                <div className='flex flex-grow justify-between'>
                    <div className='flex flex-col leading-3'>
                        <Link to={`/profile/${user_id}`} className='font-bold'>{author.fullname}</Link>
                        <span className='text-sm'>{moment(post.created_at).fromNow()}</span>
                    </div>
                    <Options isBelongsToUser={isBelongsToUser} showDeleteModal={showDeleteModal} />
                </div>
            </div>

            <div className='my-4 text-base'>
                {post.content}
            </div>

            {post.images.length > 0 &&
                <div className='-mx-4 -mt-2'>
                    <Image
                        width='100%'
                        preview={{ visible: false }}
                        src={post.images[0].url}
                        onClick={() => setPreviewVisible(true)}
                    />
                </div>
            }
            <div className='hidden'>
                <Image.PreviewGroup preview={{ visible: previewVisible, onVisibleChange: vis => setPreviewVisible(vis) }}>
                    {
                        post.images.map(image => (
                            <Image src={image.url} key={image.id} />
                        ))
                    }
                </Image.PreviewGroup>
            </div>

            <div className='text-xs flex justify-between py-1'>
                <span>{likers_count > 0 && `${likers_count} ${likers_count > 1 ? 'Likes' : 'Like'}`}</span>
                <span>{comments_count > 0 && `${comments_count} ${comments_count > 1 ? 'Comments' : 'Comment'}`}</span>
            </div>

            <div className='flex gap-2 text-lg py-1 border-t border-gray-300'>
                <LikeButton post={post} />
                <Link to={`/posts/${post.id}`} state={{post}} className='flex-grow py-1 text-center bg-white hover:bg-gray-100 rounded-full'><CommentOutlined /></Link>
            </div>

            {
                !!children && (
                    <div className='my-1 border-t border-gray-300'>
                        {children}
                    </div>
                )
            }

        </div>
    )
}