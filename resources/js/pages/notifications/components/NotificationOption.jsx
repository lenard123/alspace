import { NotificationApi } from "@/js/apis";
import Option from "@/js/components/Option";
import useClearNotificationsMutator from "@/js/query/mutators/useClearNotificationsMutator";
import queryKeyFactory from "@/js/query/queryKeyFactory";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";

export default function NotificationOption({ filter }) {

    const queryClient = useQueryClient()
    const queryKey = queryKeyFactory.notifications(filter)
    const { mutate:clearNotifications } = useClearNotificationsMutator(filter)

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case 'clear':
                clearNotifications()
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