import { Card, Tabs } from "antd";
import ChangePassword from "./components/ChangePassword";

const { TabPane } = Tabs

export default function () {
    return (
        <div className='page-wrapper sm:my-4 flex flex-col flex-grow '>
            <Card className='flex-grow '>
                <Tabs>
                    <TabPane tab='Change Password' key={1}>
                        <ChangePassword />
                    </TabPane>
                    <TabPane tab='Requests Status' key={2}>

                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}