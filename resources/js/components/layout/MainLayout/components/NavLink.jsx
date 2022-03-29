import { Button, Tooltip, } from 'antd'
import { Link } from 'react-router-dom'

const NavLink = ({ to, title, icon }) => {
    return (
        <Link to={to}>
            <Tooltip title={title}>
                <Button className='rounded-lg' icon={icon} />
            </Tooltip>
        </Link>
    )
}

export default NavLink