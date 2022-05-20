import { Route, Routes } from "react-router-dom";
import ProfilePage from "@/js/pages/profile/ProfilePage";
import { createContext } from 'react'
import AboutPage from "@/js/pages/profile/AboutPage";

export const ProfileRoutesContext = createContext()

export default function ProfileRoutes({ context })
{
    return (
        <ProfileRoutesContext.Provider value={context}>
            <Routes>
                <Route index element={<ProfilePage />} />
                <Route path="about" element={<AboutPage />} />
            </Routes>
        </ProfileRoutesContext.Provider>
    )
}