import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Home from './pages/home'
import Login from './pages/login'
import Post from './pages/post'
import Jobs from './pages/jobs'
import JobDetail from './pages/job-detail'


export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans">
        <Routes>
          
          <Route path="/" element={ <Home/> }/>
          <Route path="/post/:id" element={ <Post/> }/>
          <Route path="/jobs" element={ <Jobs/> }/>
          <Route path="/jobs/:id" element={ <JobDetail/> }/>
          <Route path="/login" element={ <Login/> }/>

        </Routes>
      </div>
    </Router>
  )
}
