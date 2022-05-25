import { Outlet, Route } from "react-router-dom";

import Login from '@/js/pages/admin/login'
import Dashboard from "../pages/admin/dashboard";
import PendingUsers from "../pages/admin/users/pending/PendingUsers";
import AdminAuthGuard from "./_guards/AdminAuthGuard";
import AdminLayout from "../components/layout/AdminLayout";
import AdminGuestGuard from "./_guards/AdminGuestGuard";
import MessageIndexPage from "../pages/admin/messages/MessageIndexPage";
import AlumniPage from "../pages/admin/users/alumni/AlumniPage";
import EventsPage from "../pages/admin/events/EventsPage";
import ManageTshirtPage from "../pages/admin/items/tshirt/ManageTshirtPage";
import AddTshirtPage from "../pages/admin/items/tshirt/AddTshirtPage";

const AdminRoutes = (
    <Route path='admin' element={<Outlet />}>

        <Route path='' element={<AdminGuestGuard />}>
            <Route path='login' element={<Login />} />
        </Route>


        <Route path='' element={<AdminAuthGuard />}>
            <Route path='' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users/pending" element={<PendingUsers />} />
                <Route path="users/alumni" element={<AlumniPage />} />
                <Route path="messages/*" element={<MessageIndexPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="items/tshirt" element={<ManageTshirtPage />} />
                <Route path="items/tshirt/new" element={<AddTshirtPage />} />
                <Route path='*' element={null} />
            </Route>
        </Route>

    </Route>
)

export default AdminRoutes