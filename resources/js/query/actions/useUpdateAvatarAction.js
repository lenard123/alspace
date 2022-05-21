import { UserApi } from "@/js/apis";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import useCurrentUserMutator from "../mutators/useCurrentUserMutator";
import { useCurrentUser } from "../queries/useCurrentUserQuery";
import queryKeyFactory from "../queryKeyFactory";


export default function useUpdateAvatarAction()
{

    const queryClient = useQueryClient()
    const { id } = useCurrentUser()
    const { updateAvatar } = useCurrentUserMutator()

    return useMutation(UserApi.updateAvatar, {
        onMutate() {
            return {
                hide: message.loading('Updating Avatar')
            }
        },

        onSuccess(avatarUrl, _var) {
            updateAvatar(avatarUrl)
            message.success('Avatar updated successfully');
        },

        onSettled(_data, _error, _variables, context)
        {
            context.hide()
        }
    })
}