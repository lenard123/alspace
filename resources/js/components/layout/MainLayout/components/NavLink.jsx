import { Badge, Button, Tooltip, } from 'antd'
import { Link } from 'react-router-dom'

const NavLink = ({ to, title, icon, badge }) => {
    return (
        <Link to={to}>
            <Tooltip placement='bottom' title={title}>
                <Badge {...(badge || {})}>
                    <Button className='rounded-lg' icon={icon} />
                </Badge>
            </Tooltip>
        </Link>
    )
}

export default NavLink