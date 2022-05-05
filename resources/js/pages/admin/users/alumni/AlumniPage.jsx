import { Breadcrumb, PageHeader } from "antd";


export default function AlumniPage() {
    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>Alumni</Breadcrumb.Item>
                    </Breadcrumb>
                }
                title='Manage Alumni'
            />
        </>
    )
}