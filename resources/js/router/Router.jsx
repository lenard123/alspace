import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthGuard from './_guards/AuthGuard'

import MainLayout from '@/js/components/layout/MainLayout'


import Home from '@/js/pages/home'
import Notifications from '@/js/pages/notifications'
import Message from '@/js/pages/message'
import Post from '@/js/pages/posts/[id]'
import Questions from '@/js/pages/questions'
import Jobs from '@/js/pages/jobs'
import Events from '@/js/pages/events'
import Profile from '@/js/pages/profile'
import Settings from '@/js/pages/settings'

import Login from '@/js/pages/login'
import Register from '@/js/pages/register'
import GuestGuard from './_guards/GuestGuard'

export default () => (
    <BrowserRouter>
        <Routes>

            <Route path='' element={<AuthGuard />}>
                <Route path='/' element={<MainLayout />} >
                    <Route index element={<Home />} />
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
            </Route>

            <Route path='' element={<GuestGuard />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
        </Routes>
    </BrowserRouter>
)