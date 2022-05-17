import { JobApi } from "@/js/apis";
import { invoke } from "@/js/utils";
import { useMutation, useQueryClient } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


const postJobAction = async (data) => {
    const formData = new FormData()
    formData.append('company', data.company)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('tags', JSON.stringify(data.tags))
    
    if(data.image) {
        formData.append('image', data.image)
    }
    return await JobApi.postJob(formData)
}

export default function usePostJobAction(options = {})
{
    const queryClient = useQueryClient()
    return useMutation(postJobAction, {
        ...options,
        onSuccess(data)
        {
            queryClient.invalidateQueries(queryKeyFactory.jobs)
            invoke(options.onSuccess)
        }
    })
}