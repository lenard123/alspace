import { Breadcrumb, PageHeader } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

export default function PendingUsers() {
    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Users</BreadcrumbItem>
                        <BreadcrumbItem>Pending</BreadcrumbItem>
                    </Breadcrumb>
                }
                title='Pending Users'
            />

        </>
    )
}