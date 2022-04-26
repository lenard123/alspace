import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthGuard from './_guards/AuthGuard'

import MainLayout from '@/js/components/layout/MainLayout'
import MessageLayout from '../components/layout/MessageLayout'
import ProfileLayout from '@/js/components/layout/ProfileLayout'

import Home from '@/js/pages/home'
import Notifications from '@/js/pages/notifications'
import Message from '@/js/pages/message'
import ChatPage from '../pages/message/[id]/ChatPage'
import Post from '@/js/pages/posts/[id]'
import Questions from '@/js/pages/questions'
import Jobs from '@/js/pages/jobs'
import Events from '@/js/pages/events'
import EventDetails from '@/js/pages/events/[id]'
import Settings from '@/js/pages/settings'

import Login from '@/js/pages/login'
import Register from '@/js/pages/register'
import GuestGuard from './_guards/GuestGuard'
import ProfilePage from '@/js/pages/profile'
import AdminRoutes from './AdminRoutes'

export default () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='' element={<AuthGuard />}>
                    <Route path='/' element={<MainLayout />} >
                        <Route index element={<Home />} />
                        <Route path='posts/:id' element={<Post />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='messages' element={<MessageLayout />} >
                            <Route index element={<Message />} />
                            <Route path=':id' element={<ChatPage />} />
                        </Route>
                        <Route path='questions' element={<Questions />} />
                        <Route path='jobs' element={<Jobs />} />
                        <Route path='events'>
                            <Route index element={<Events />} />
                            <Route path=':id' element={<EventDetails />} />
                        </Route>
                        <Route path='profile/:id' element={<ProfileLayout />}>
                            <Route index element={<ProfilePage />} />
                            <Route path='about' element={null} />
                            <Route path='jobs' element={null} />
                        </Route>
                        <Route path='settings' element={<Settings />} />
                    </Route>
                </Route>

                <Route path='' element={<GuestGuard />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>

                {AdminRoutes}

            </Routes>
        </BrowserRouter>
    )
}