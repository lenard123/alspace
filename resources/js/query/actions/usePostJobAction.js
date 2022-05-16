import { JobApi } from "@/js/apis";
import { useMutation } from "react-query";


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

export default function usePostJobAction()
{
    return useMutation(postJobAction, {
        onSettled(data, error){
            console.log({data, error})
        }
    })
}