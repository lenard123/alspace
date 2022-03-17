import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'

import Home from './pages/home'
import Notifications from './pages/notifications'
import Message from './pages/message'
import Post from './pages/posts/[id]'
import Questions from './pages/questions'
import Jobs from './pages/jobs'
import Events from './pages/events'
import Profile from './pages/profile'
import Settings from './pages/settings'

import Login from './pages/login'

export default () => (
    <BrowserRouter>
        <Routes>

            <Route path='/' element={<MainLayout />} >
                <Route index element={<Home />}/>
                <Route path='posts/:id' element={<Post />} />
                <Route path='notifications' element={<Notifications />} />
                <Route path='message' element={<Message />} />
                <Route path='questions' element={<Questions />} />
                <Route path='jobs' element={<Jobs />} />
                <Route path='events' element={<Events />} />
                <Route path='profile' element={<Profile />} />
                <Route path='profile/:id' element={<Profile />} />
                <Route path='settings' element={<Settings />} />
            </Route>

            <Route path='/login' element={<Login />} />

        </Routes>
    </BrowserRouter>
)