import Option from "@/js/components/Option";
import useClearNotificationsAction from "@/js/query/actions/useClearNotificationsAction";
import useReadAllNotificationsAction from "@/js/query/actions/useReadAllNotificationsAction";

export default function NotificationOption({ filter }) {

    const { mutate:clearNotifications } = useClearNotificationsAction(filter)
    const { mutate:readAllNotifications } = useReadAllNotificationsAction(filter)

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case 'clear':
                clearNotifications()
                break;
            case 'read':
                readAllNotifications()
                break;
        }
    }

    return (
        <Option
            onMenuClick={handleMenuClick}
            menuOptions={[
                { key: 'clear', label: 'Clear All' },
                { key: 'read', label: 'Mark All as Read' }
            ]}
        />
    )
}