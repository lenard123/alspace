import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'

import Home from './pages/home'
import Notifications from './pages/notifications'
import Post from './pages/posts/[id]'
import Questions from './pages/questions'
import Jobs from './pages/jobs'

export default () => (
    <BrowserRouter>
        <Routes>

            <Route path='/' element={<MainLayout />} >
                <Route index element={<Home />}/>
                <Route path='posts/:id' element={<Post />} />
                <Route path='notifications' element={<Notifications />} />
                <Route path='questions' element={<Questions />} />
                <Route path='jobs' element={<Jobs />} />
            </Route>

        </Routes>
    </BrowserRouter>
)