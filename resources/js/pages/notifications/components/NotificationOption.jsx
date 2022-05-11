import Option from "@/js/components/Option";
import useClearNotificationsMutator from "@/js/query/mutators/useClearNotificationsMutator";
import useReadAllNotificationsMutator from "@/js/query/mutators/useReadAllNotificationsMutator";

export default function NotificationOption({ filter }) {

    const { mutate:clearNotifications } = useClearNotificationsMutator(filter)
    const { mutate:readAllNotifications } = useReadAllNotificationsMutator(filter)

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