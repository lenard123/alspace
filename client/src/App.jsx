import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'

import Home from './pages/Home/Home'
import Notifications from './pages/Notifications/Notifications'
import Post from './pages/Post/[id]'
import Questions from './pages/Qustions/Qustions'
import Jobs from './pages/jobs'

export default () => (
    <BrowserRouter>
        <Routes>

            <Route path='/' element={<MainLayout />} >
                <Route index element={<Home />}/>
                <Route path='post/:id' element={<Post />} />
                <Route path='notifications' element={<Notifications />} />
                <Route path='questions' element={<Questions />} />
                <Route path='jobs' element={<Jobs />} />
            </Route>

        </Routes>
    </BrowserRouter>
)