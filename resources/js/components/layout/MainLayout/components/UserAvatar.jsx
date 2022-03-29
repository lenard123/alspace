import { useState } from 'react'
import { Dropdown, Avatar } from 'antd'
import UserAvatarMenu from './UserAvatarMenu'
import { useRecoilValue } from 'recoil'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'

export default function UserAvatar() {

    const [isOpen, setIsOpen] = useState(false)
    const { avatar } = useRecoilValue(currentUserSelector)

    return (
        <Dropdown onVisibleChange={setIsOpen} visible={isOpen} trigger={['click']} overlay={<UserAvatarMenu setIsOpen={setIsOpen}/>} placement='bottomRight'>
            <Avatar onClick={()=>setIsOpen(true)} className='ml-8 cursor-pointer' size='large' src={avatar} />
        </Dropdown>
    )
}