import { Button, Dropdown, Menu } from 'antd'
import { DotsHorizontalOutlined } from '../icons'

export default function Option({ onMenuClick, menuOptions, children, placement="bottomRight" }) {

    return (
            <Dropdown 
                trigger={['click']} 
                overlay={<Menu items={menuOptions} onClick={onMenuClick} />} 
                placement={placement}
                >
                {children || <Button type='text' shape='circle' icon={<DotsHorizontalOutlined className='cursor-pointer'/>} />}
            </Dropdown>
    )
}