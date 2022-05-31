import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import AvailableTShirt from "./components/AvailableTShirt";

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
                        <TabPane tab='Alumni ID' key={2}></TabPane>
                        <TabPane tab='Pending Request' key={3}></TabPane>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}