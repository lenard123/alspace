import { Outlet, Route } from "react-router-dom";

import Login from '@/js/pages/admin/login'
import Dashboard from "../pages/admin/dashboard";
import AdminAuthGuard from "./_guards/AdminAuthGuard";
import AdminLayout from "../components/layout/AdminLayout";
import AdminGuestGuard from "./_guards/AdminGuestGuard";

const AdminRoutes = (
    <Route path='admin' element={<Outlet />}>

        <Route path='' element={<AdminAuthGuard />}>
            <Route path='' element={<AdminLayout />}>
                <Route index element={<Dashboard />}/>
            </Route>
        </Route>

        <Route path='' element={<AdminGuestGuard />}>
            <Route path='login' element={<Login />} />
        </Route>

    </Route>
)

export default AdminRoutes