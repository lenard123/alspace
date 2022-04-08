import { useQuery } from "react-query"
import { fetchPost } from "../apis/PostApi"
import queryKeyFactory from "./queryKeyFactory"


const usePostQuery =  (id) => {
    return useQuery(queryKeyFactory.post(id), () => fetchPost(id), {
        enabled: !!id
    })
}

export default usePostQuery