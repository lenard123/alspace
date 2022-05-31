import LoadingPage from "@/js/components/LoadingPage";
import { Breadcrumb, Button, Collapse, PageHeader } from "antd";
import { Link } from "react-router-dom";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { useQuery } from "react-query";
import { EditOutlined } from "@ant-design/icons";

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/faqs')
}

export default function ManageFAQ() {

    const { data, isLoading } = useQuery({
        queryKey: ['faqs'],
        queryFn: apiCall
    })

    return (
        <>
            <PageHeader
                title='Manage Frequently Ask Questions'
                extra={[
                    <Link key='add' to='/admin/settings/faqs/new'>
                        <Button type='primary' shape='round'>Add FAQ</Button>
                    </Link>
                ]}
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/admin/settings/faqs">Manage FAQs</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
            />
            <div className='bg-white p-6 sm:mx-6 mb-8'>
                {isLoading ? <LoadingPage /> : 
                    <Collapse>
                        {data.map(faq => (
                            <Collapse.Panel header={faq.question} key={faq.id} extra={<EditOutlined />}>
                                {faq.answer}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                }
            </div>
        </>
    )
}