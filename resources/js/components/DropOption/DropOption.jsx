import { BarsOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";


export default function DropOption({ menuOptions, onMenuClick, dropdownProps = {} }) {
    return (
        <Dropdown
            overlay={<Menu onClick={onMenuClick} items={menuOptions} />}
            trigger={['click']}
            {...dropdownProps}
            >
            <Button className='border-none'>
                <BarsOutlined className='mr-[2px]'/>
                <DownOutlined />
            </Button>
        </Dropdown>
    )
}