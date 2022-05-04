import { Spin } from "antd";
import { Navigate } from "react-router-dom";
import useThreadWithQuery from "@/js/query/useThreadWithQuery";

export default function MessageIndexSearchUserPage({userId})
{
    const {data, isSuccess } = useThreadWithQuery(userId)

    if (isSuccess) {
        return <Navigate to={`/messages/${data.id}`} replace/>
    }

    return <div className='bg-white z-[5] flex h-full items-center justify-center fixed sm:static inset-0'><Spin spinning /></div>
}