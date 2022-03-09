import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import MainLayout from '/src/components/layouts/main-layout'

import Login from './pages/login'
import Home from './pages/home'
import Post from './pages/post'
import Jobs from './pages/jobs'
import JobDetail from './pages/job-detail'
import Messages from './pages/messages'
import Notifications from './pages/notifications'
import Questions from './pages/questions'
import Events from './pages/events'
import Profile from './pages/profile'
import Settings from './pages/settings'

export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans">
        <Routes>
          
          <Route path="/" element={ <MainLayout/> }>
            <Route index element={ <Home/> }/>
            <Route path="post/:id" element={ <Post/> }/>
            <Route path="jobs" element={ <Jobs/> }/>
            <Route path="jobs/:id" element={ <JobDetail/> }/>
            <Route path="messages" element={ <Messages/> }/> 
            <Route path="notifications" element={ <Notifications/> }/>
            <Route path="questions" element={ <Questions/> }/>
            <Route path="events" element={ <Events/> }/>
            <Route path="profile/:id" element={ <Profile/> }/>
            <Route path="settings" element={ <Settings/> }/>
          </Route>

          <Route path="/login" element={ <Login/> }/>

        </Routes>
      </div>
    </Router>
  )
}
