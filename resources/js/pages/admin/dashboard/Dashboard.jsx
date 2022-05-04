import { Breadcrumb, PageHeader } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

export default function Dashboard() {
    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Dashboard</BreadcrumbItem>
                    </Breadcrumb>
                }
            />
        </>
    )
}