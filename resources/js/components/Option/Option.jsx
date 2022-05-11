import { Button, Dropdown, Menu } from 'antd'
import { DotsHorizontalOutlined } from '../icons'

export default function Options({ onMenuClick, menuOptions }) {

    return (
            <Dropdown 
                trigger={['click']} 
                overlay={<Menu items={menuOptions} onClick={onMenuClick} />} 
                placement="bottomRight"
                >
                <Button type='text' shape='circle' icon={<DotsHorizontalOutlined className='cursor-pointer'/>} />
            </Dropdown>
    )
}