import { UserApi } from "@/js/apis";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import queryKeyFactory from "../queryKeyFactory";


export default function useUpdateAvatarAction()
{

    const queryClient = useQueryClient()

    return useMutation(UserApi.updateAvatar, {
        onMutate() {
            return {
                hide: message.loading('Updating Avatar')
            }
        },

        onSuccess(_data, _var) {
            queryClient.invalidateQueries(queryKeyFactory.currentUser)
            message.success('Avatar updated successfully');
        },

        onSettled(_data, _error, _variables, context)
        {
            context.hide()
        }
    })
}