import { PageHeader, Tabs } from "antd";
import RequestTable from "./components/RequestTable";


export default function ManageRequests()
{
    return (
        <>
            <PageHeader title='Manage Requests'/>

            <div className='bg-white p-6 sm:mx-6'>
                <Tabs destroyInactiveTabPane>
                    <Tabs.TabPane tab='Pending Requests' key={1}>
                        <RequestTable filter='PENDING' />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Ready' key={3}>
                        <RequestTable filter='READY' />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Completed' key={4}>
                        <RequestTable filter='COMPLETED' />
                    </Tabs.TabPane>

                    <Tabs.TabPane tab='Cancelled' key={5}>
                        <RequestTable filter='CANCELLED' />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>
    )
}