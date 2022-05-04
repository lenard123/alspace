import { useQuery } from "react-query"
import { fetchPost } from "../apis/PostApi"
import { getPayload } from "../utils"
import queryKeyFactory from "./queryKeyFactory"


const usePostQuery =  (id) => {
    return useQuery({
        queryKey: queryKeyFactory.post(id), 
        queryFn: () => fetchPost(id),
        initialData: getPayload(),
        enabled: !!id
    })
}

export default usePostQuery