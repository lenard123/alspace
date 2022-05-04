import { useLogout } from "@/js/hooks"
import { useCurrentUser } from "@/js/query/useCurrentUserQuery"
import { LogoutOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Menu } from "antd"

function MenuOverlay() {

    const { showLogoutModal } = useLogout()

    const menuClick = ({key}) => {
        switch(key) {
            case 'logout': {
                showLogoutModal()
                break;
            }
        }
    }

    return (
        <Menu onClick={menuClick} selectable={false} items={[
            {key: 'logout', label: 'Sign out', icon: <LogoutOutlined />}
        ]}/>
    )
}

export default function TopbarAvatar()
{
    const { avatarUrl } = useCurrentUser()

    return (
        <Dropdown overlay={<MenuOverlay />} placement='bottomRight'>
            <Avatar src={avatarUrl} />
        </Dropdown>
    )
}