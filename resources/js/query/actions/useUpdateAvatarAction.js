import { UserApi } from "@/js/apis";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { useCurrentUser } from "../queries/useCurrentUserQuery";
import queryKeyFactory from "../queryKeyFactory";


export default function useUpdateAvatarAction()
{

    const queryClient = useQueryClient()
    const { id } = useCurrentUser()

    return useMutation(UserApi.updateAvatar, {
        onMutate() {
            return {
                hide: message.loading('Updating Avatar')
            }
        },

        onSuccess(_data, _var) {
            queryClient.invalidateQueries(queryKeyFactory.currentUser)
            queryClient.invalidateQueries(queryKeyFactory.user(id))
            message.success('Avatar updated successfully');
        },

        onSettled(_data, _error, _variables, context)
        {
            context.hide()
        }
    })
}