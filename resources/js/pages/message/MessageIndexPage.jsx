import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Helmet } from 'react-helmet'
import { useSearchParams,  } from "react-router-dom";
import { useState, useEffect } from 'react'
import MessageIndexDefaultPage from "./MessageIndexDefaultPage";
import MessageIndexSearchUserPage from "./MessageIndexSearchUserPage";

export default function MessagePageIndex() {

    const [params] = useSearchParams()
    const [userId, setUserId] = useState(undefined)

    useEffect(() => {
        setUserId(params.get('user_id'))
    }, [params])

    if (userId) {
        return <MessageIndexSearchUserPage userId={userId} />
    }

    return MessageIndexDefaultPage
}