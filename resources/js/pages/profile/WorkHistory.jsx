import useAlumniWorksQuery from "@/js/query/queries/useAlumniWorksQuery";
import { useIsCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { EditOutlined } from "@ant-design/icons";
import { Card, Spin, Timeline, Typography, Empty, Button } from "antd";
import { useParams } from "react-router-dom";
import AddWorkModal from "./components/AddWorkModal";
import WorkListItem from "./components/WorkListItem";
import { useState } from 'react'

const { Title } = Typography


export default function WorkHistory() {
    const { id } = useParams()
    const { data, isLoading } = useAlumniWorksQuery(id)
    const isCurrentUser = useIsCurrentUser(id)
    const [addWorkForm, setAddWorkForm] = useState(false)

    return (
        <>
            <Card
                className='max-w-xl mt-3'
                title={(
                    <div className='flex justify-between'>
                        <Title level={4}>Work Experience</Title>
                        {isCurrentUser && <Button onClick={() => setAddWorkForm(true)} type='text' shape='circle' icon={<EditOutlined />} />}
                    </div>
                )}
                >
                {isLoading
                    ? <Spin className='w-full' />
                    : data.length > 0
                        ? (
                            <Timeline>
                                {data.map(work => <WorkListItem key={work.id} work={work} />)}
                            </Timeline>
                        )
                        : <Empty />
                }
            </Card>
            <AddWorkModal isOpen={addWorkForm} setIsOpen={setAddWorkForm} alumni_id={id}/>
        </>
    )
}