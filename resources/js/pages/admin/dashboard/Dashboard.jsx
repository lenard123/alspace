import { Badge, Breadcrumb, Calendar, Card, PageHeader, Skeleton, Typography } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { useQuery } from "react-query";
import Helmet from 'react-helmet'
import moment from "moment";


const { Title } = Typography

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/dashboard')
}

const apiFetchAllEvents = async () => {
    await requestCookie()
    return await Http.get('/events/all')
}

const getStatus = (status) => {
    switch (status) {
        case 'pending': return 'warning'
        case 'approved': return 'success'
    }
    return 'error'
}

export default function Dashboard() {

    const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: apiCall })
    const { data: events, isLoading: eventsIsLoading } = useQuery({ 
        queryKey: ['events', 'all'], 
        queryFn: apiFetchAllEvents ,
        onSuccess(data){
            console.log(data)
        },
    })


    const getListData = (value) => {
        if (eventsIsLoading) return []
        let _value = value.format('Y-M-D')
        return events.filter(event => {
            return moment(event.start_at).format('Y-M-D') == _value
        });
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.id}>
                        <Badge status={getStatus(item.status)} text={item.title} />
                        {/* <Badge  text={item.title} /> */}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Dashboard</BreadcrumbItem>
                    </Breadcrumb>
                }
            />

            <div className='mx-6'>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>

                    <div className="bg-grad-1 rounded text-white" style={{ lineHeight: 0 }}>
                        <div className="px-3 pt-3">
                            <p className="text-xs font-semibold opacity-50">
                                <span className="block">Pending</span>Registration
                            </p>
                            <div className="font-bold text-3xl mb-0">
                                {isLoading ? <Skeleton.Input /> : data.pending_users}
                            </div>
                        </div>
                        <svg className="mb-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="rgba(255,255,255,0.3)" fillOpacity={1} d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="bg-grad-2 rounded text-white" style={{ lineHeight: 0 }}>
                        <div className="px-3 pt-3">
                            <p className="text-xs font-semibold opacity-50">
                                <span className="block">Total</span>Registered Alumni
                            </p>
                            <div className="font-bold text-3xl mb-0">
                                {isLoading ? <Skeleton.Input /> : data.registered_users}
                            </div>
                        </div>
                        <svg className="mb-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="rgba(255,255,255,0.3)" fillOpacity={1} d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="bg-grad-3 rounded text-white" style={{ lineHeight: 0 }}>
                        <div className="px-3 pt-3">
                            <p className="text-xs font-semibold opacity-50">
                                <span className="block">Total</span>Sales
                            </p>
                            <div className="font-bold text-3xl mb-0">
                                {isLoading ? <Skeleton.Input /> : data.total_sales}
                            </div>
                        </div>
                        <svg className="mb-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="rgba(255,255,255,0.3)" fillOpacity={1} d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="bg-grad-4 rounded text-white" style={{ lineHeight: 0 }}>
                        <div className="px-3 pt-3">
                            <p className="text-xs font-semibold opacity-50">
                                <span className="block">Pending</span>Item Requests
                            </p>
                            <div className="font-bold text-3xl mb-0">
                                {isLoading ? <Skeleton.Input /> : data.pending_requests}
                            </div>
                        </div>
                        <svg className="mb-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="rgba(255,255,255,0.3)" fillOpacity={1} d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                        </svg>
                    </div>



                </div>

                <Title className='mt-8' level={3}>Upcoming Events</Title>

                <Card className="mb-4">
                    <Calendar dateCellRender={dateCellRender}/>
                </Card>
            </div>
        </>
    )
}