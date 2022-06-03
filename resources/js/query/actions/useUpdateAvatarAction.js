import { UserApi } from "@/js/apis";
import { successMessage } from "@/js/utils";
import { message } from "antd";
import { useMutation } from "react-query";
import useCurrentUserMutator from "../mutators/useCurrentUserMutator";


export default function useUpdateAvatarAction()
{

    const { setAvatar } = useCurrentUserMutator()

    return useMutation(UserApi.updateAvatar, {
        onMutate() {
            return {
                hide: message.loading('Updating Avatar')
            }
        },

        onSuccess(avatarUrl, _var) {
            setAvatar(avatarUrl)
            successMessage('Avatar updated successfully');
        },

        onSettled(_data, _error, _variables, context) {
            context.hide()
        }
    })
}