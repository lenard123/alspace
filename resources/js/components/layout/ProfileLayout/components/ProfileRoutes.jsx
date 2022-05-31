import { Route, Routes } from "react-router-dom";
import ProfilePage from "@/js/pages/profile/ProfilePage";
import { createContext } from 'react'
import AboutPage from "@/js/pages/profile/AboutPage";
import WorkHistory from "@/js/pages/profile/WorkHistory";
import UpdateProfile from "@/js/pages/profile/UpdateProfile";

export const ProfileRoutesContext = createContext()

export default function ProfileRoutes({ context })
{
    return (
        <ProfileRoutesContext.Provider value={context}>
            <Routes>
                <Route index element={<ProfilePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="work" element={<WorkHistory />} />
                <Route path="edit" element={<UpdateProfile />} />
            </Routes>
        </ProfileRoutesContext.Provider>
    )
}