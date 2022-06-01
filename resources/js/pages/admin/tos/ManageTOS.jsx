import { PageHeader, Tabs } from "antd";
import Http, { requestCookie } from '@/js/utils/Http'
import { useQuery } from "react-query";
import LoadingPage from "@/js/components/LoadingPage";
import PreviewTOS from "./PreviewTos";
import UpdateTOS from "./UpdateTOS";
import { useState } from 'react'

const { TabPane } = Tabs

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/tos')
}

export default function ManageTOS() {

    const [tos, setTos] = useState()
    const { data, isLoading } = useQuery({
        queryKey: ['tos'],
        queryFn: apiCall,
        onSuccess(data) {
            setTos(data.value)
        }
    })

    return (
        <>
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