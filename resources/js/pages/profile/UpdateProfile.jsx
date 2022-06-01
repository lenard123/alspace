import { ProfileRoutesContext } from "@/js/components/layout/ProfileLayout/components/ProfileRoutes";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { Button, Card, DatePicker, Form, Input, Select, Typography } from "antd";
import { Navigate } from "react-router-dom";
import { useContext } from 'react'
import UpdateInfo from "./components/UpdateInfo";
import moment from "moment";
const { Title, Text, Paragraph } = Typography

export default function UpdateProfile() {

    const { id: currentUserId } = useCurrentUser()
    const { user } = useContext(ProfileRoutesContext)
    const { bio, gender, birthday } = user.info

    if (user.id !== currentUserId) {
        return <Navigate to={`/profile/${user.id}`} />
    }

    return (
        <>
            <UpdateInfo initialValues={{bio, gender, birthday: birthday && moment(birthday)}} />

        </>
    )
}