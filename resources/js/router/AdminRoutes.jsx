import { Outlet, Route, Routes } from "react-router-dom";
import Login from '@/js/pages/admin/login'

const AdminRoutes = (
    <Route path='admin' element={<Outlet />}>
        <Route path='login' element={<Login />} />
    </Route>
)

export default AdminRoutes