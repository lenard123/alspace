import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import AvailableTShirt from "./components/AvailableTShirt";
import RequestsStatus from "./components/RequestsStatus";

const { TabPane } = Tabs

export default function TShirtPage() {
    return (
        <>
            <div className='page-wrapper sm:my-4 flex flex-col flex-grow '>
                <Card className='flex-grow '>
                    <Tabs>
                        <TabPane tab='Available Tshirts' key={1}>
                            <AvailableTShirt />
                        </TabPane>
                        <TabPane tab='Requests Status' key={2}>
                            <RequestsStatus />
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}