import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { createContext, useState } from "react"
import useSupportMessageReceivedListener from "@/js/listeners/useSupportMessageReceivedListener";

export const AdminLayoutContext = createContext({
    collapsed: false,
    setCollapsed: () => { },
    broken: false,
    setBroken: () => { }
})

export default function AdminLayout() {

    useSupportMessageReceivedListener()

    const [collapsed, setCollapsed] = useState(false)
    const [broken, setBroken] = useState(false)

    const value = { collapsed, setCollapsed, broken, setBroken }

    return (
        <AdminLayoutContext.Provider value={value}>
            <Layout className='min-h-screen' hasSider>

                <Sidebar />

                <Layout>
                    <Topbar />
                    <Content>
                        <Outlet />
                    </Content>
                    <div className="text-center mt-8 p-6 bg-gray-50">
                        <span>© 2022 Copyright: </span>
                        <a className="text-gray-600 font-semibold" href="/">Alspace</a>
                    </div>
                </Layout>

            </Layout>
        </AdminLayoutContext.Provider>
    )
}