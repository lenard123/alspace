import { Outlet, Route } from "react-router-dom";

import Login from '@/js/pages/admin/login'
import Dashboard from "../pages/admin/dashboard";

const AdminRoutes = (
    <Route path='admin' element={<Outlet />}>

        <Route path='login' element={<Login />} />

        <Route path='' element={<Dashboard />}/>

    </Route>
)

export default AdminRoutes