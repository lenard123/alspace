import { MenuOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { Link } from "react-router-dom";


export default function NavbarLogo({ showDot, showDrawer }) {
    return (
        <div className='flex w-full md:w-auto justify-between items-center'>
            <Link to='/' className='flex gap-2 items-center'>
                <img className='rounded' src='/images/logo.png' height='32' width='auto' />
                <span className='font-bold text-xl'>Alspace</span>
            </Link>
            <Badge dot={showDot} className='md:hidden'>
                <Button onClick={showDrawer} icon={<MenuOutlined />} />
            </Badge>
        </div>
    )
}