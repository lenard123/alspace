import { useState } from 'react'
import { Dropdown, Avatar } from 'antd'
import UserAvatarMenu from './UserAvatarMenu'
import { useCurrentUser } from '@/js/query/queries/useCurrentUserQuery'

export default function UserAvatar() {

    const [isOpen, setIsOpen] = useState(false)
    const { avatarUrl } = useCurrentUser()

    return (
        <Dropdown onVisibleChange={setIsOpen} visible={isOpen} trigger={['click']} overlay={<UserAvatarMenu setIsOpen={setIsOpen}/>} placement='bottomRight'>
            <Avatar onClick={()=>setIsOpen(true)} className='ml-8 cursor-pointer' size='large' src={avatarUrl} />
        </Dropdown>
    )
}