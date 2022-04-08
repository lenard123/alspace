import { fetchThreadWith } from "@/js/apis/UserApi";
import { Spin } from "antd";
import { useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import useConversationQuery from "@/js/queries/useConversationQuery";
import useThreadWithQuery from "@/js/queries/useThreadWithQuery";

export default function MessageIndexSearchUserPage({userId})
{
    const {data, isSuccess } = useThreadWithQuery(userId)

    if (isSuccess) {
        return <Navigate to={`/messages/${data.id}`} />
    }

    return <div className='bg-white z-[5] flex h-full items-center justify-center fixed sm:static inset-0'><Spin spinning /></div>
}