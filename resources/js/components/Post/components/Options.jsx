import { Button, Dropdown, Menu } from 'antd'
import { BookOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons'
import { DotsHorizontalOutlined } from '../../icons'
import usePostLogic from '../usePostLogic'

export default function Options({ isBelongsToUser, showDeleteModal }) {

    const handleClick = ({key}) => {
        if (key === 'delete') {
            showDeleteModal()
        }
    }

    return (
            <Dropdown 
                trigger={['click']} 
                overlay={(
                    <Menu onClick={handleClick} className='min-w-[8rem]'>
                        <Menu.Item icon={<BookOutlined />} key='save'>Save</Menu.Item>
                        <Menu.Item icon={<WarningOutlined />} key='report'>Report</Menu.Item>
                        { isBelongsToUser && <Menu.Item icon={<DeleteOutlined />} key='delete' danger={true}>Delete</Menu.Item> }
                    </Menu>
                )} 
                placement="bottomRight"
                >
                <Button type='text' shape='circle' icon={<DotsHorizontalOutlined className='cursor-pointer'/>} />
            </Dropdown>
    )
}