import { useQuery } from "react-query"
import { fetchPost } from "../../apis/PostApi"
import { getPayload } from "../../utils"
import queryKeyFactory from "../queryKeyFactory"


const usePostQuery =  (id, initialData = undefined) => {

    const payload = getPayload()

    return useQuery({
        queryKey: queryKeyFactory.post(id), 
        queryFn: () => fetchPost(id),
        initialData: payload || initialData,
        enabled: !!id
    })
}

export default usePostQuery