import { LikeFilled } from "@ant-design/icons"
import { Avatar, Comment as AntComment } from "antd"
import moment from 'moment'
import LikeButton from "./components/LikeButton"
import { useState } from 'react'
import CommentsList from "../CommentsList"

export default function Comment({ comment }) {

    const [isReplyVisible, setIsReplyVisible] = useState(false)
    const { user, content, created_at, likers_count, comments_count, id } = comment

    return (
        <AntComment
            className='w-full Comment'
            actions={[
                <LikeButton key='like' comment={comment}/>,
                <span onClick={() => setIsReplyVisible(true)} key='reply'>Reply</span>,
                <span onClick={() => setIsReplyVisible(x => !x)} key='toggle_reply_visibility'>{isReplyVisible ? 'Hide Replies' : `View Replies ${comments_count ?? ''}`}</span>,
                likers_count > 0 && <span key='liker_count'><LikeFilled /> {likers_count}</span>
            ]}
            avatar={<Avatar src={user.avatarUrl} />}
            author={user.fullname}
            content={content}
            datetime={moment(created_at).fromNow()}
        >
        {
            isReplyVisible && (
                <CommentsList type='comment' id={id} fullname={user.fullname}/>
            )
        }
        </AntComment>
    )
}