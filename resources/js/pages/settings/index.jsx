import { Card, Tabs } from "antd";
import ChangePassword from "./components/ChangePassword";
import Helmet from 'react-helmet'

const { TabPane } = Tabs

export default function () {
    return (
        <div className='page-wrapper sm:my-4 flex flex-col flex-grow '>
            <Helmet>
                <title>Settings</title>
            </Helmet>
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