import { PageHeader, Tabs } from "antd";
import LoadingPage from "@/js/components/LoadingPage";
import PreviewTOS from "./PreviewTos";
import UpdateTOS from "./UpdateTOS";
import { useState } from 'react'
import useTOSQuery from "@/js/query/queries/useTOSQuery";
import Helmet from 'react-helmet'

const { TabPane } = Tabs


export default function ManageTOS() {

    const [tos, setTos] = useState()
    const { data, isLoading } = useTOSQuery({ onSuccess: data => setTos(data.value) })


    return (
        <>
            <Helmet>
                <title>Terms of Service</title>
            </Helmet>
            <PageHeader title='Update Terms of Services' />
            <div className='bg-white p-6 sm:mx-6 mb-4 sm:mb-0'>
                {isLoading
                    ? <LoadingPage />
                    : (
                        <Tabs>
                            <TabPane tab='Preview' key={1}>
                                <PreviewTOS tos={tos} />
                            </TabPane>
                            <TabPane tab='Edit' key={2}>
                                <UpdateTOS initialValues={{tos: data.value}} tos={tos} setTos={setTos}/>
                            </TabPane>
                        </Tabs>
                    )
                }
            </div>
        </>
    )
}