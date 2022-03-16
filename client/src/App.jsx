import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home/Home'

export default () => (
    <BrowserRouter>
        <Routes>

            <Route path='/' element={<MainLayout />} >
                <Route index element={<Home />}/>
            </Route>

        </Routes>
    </BrowserRouter>
)