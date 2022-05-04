import { useQuery } from "react-query"
import { fetchThreadWith } from "../../apis/UserApi"
import queryKeyFactory from "../queryKeyFactory"


const useThreadWithQuery = (userId, options = {}) => {
    return useQuery({
        queryKey: queryKeyFactory.threadWith(userId),
        queryFn: () => fetchThreadWith(userId),
        ...options
    })
}

export default useThreadWithQuery