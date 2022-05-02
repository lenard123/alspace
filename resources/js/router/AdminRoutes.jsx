import { Outlet, Route } from "react-router-dom";

import Login from '@/js/pages/admin/login'
import Dashboard from "../pages/admin/dashboard";
import AdminGuard from "./_guards/AdminGuard";
import AdminLayout from "../components/layout/AdminLayout";

const AdminRoutes = (
    <Route path='admin' element={<Outlet />}>

        <Route path='' element={<AdminGuard />}>
            <Route path='' element={<AdminLayout />}>
                <Route index element={<Dashboard />}/>
            </Route>
        </Route>

        <Route path='login' element={<Login />} />

    </Route>
)

export default AdminRoutes