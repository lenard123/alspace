import { Outlet, Route } from "react-router-dom";

import Login from '@/js/pages/admin/login'
import Dashboard from "../pages/admin/dashboard";
import PendingUsers from "../pages/admin/users/pending/PendingUsers";
import AdminAuthGuard from "./_guards/AdminAuthGuard";
import AdminLayout from "../components/layout/AdminLayout";
import AdminGuestGuard from "./_guards/AdminGuestGuard";
import MessageIndexPage from "../pages/admin/messages/MessageIndexPage";

const AdminRoutes = (
    <Route path='admin' element={<Outlet />}>

        <Route path='' element={<AdminGuestGuard />}>
            <Route path='login' element={<Login />} />
        </Route>


        <Route path='' element={<AdminAuthGuard />}>
            <Route path='' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users/pending" element={<PendingUsers />} />
                <Route path="messages/*" element={<MessageIndexPage />} />
                <Route path='*' element={null} />
            </Route>
        </Route>

    </Route>
)

export default AdminRoutes