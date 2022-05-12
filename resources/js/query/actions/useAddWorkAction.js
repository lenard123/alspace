import { WorkApi } from "@/js/apis";
import { useMutation } from "react-query";


export default function useAddWorkAction(option = {})
{
    return useMutation(WorkApi.addWorkExperience, option)
}