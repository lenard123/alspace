import { useMutation } from "react-query";
import { message } from "antd";
import { UserApi } from "@/js/apis";
import _ from 'lodash'
import useCurrentUserMutator from "../mutators/useCurrentUserMutator";
import { successMessage } from "@/js/utils";

export default function useUpdateProfileCoverAction()
{

    const { setCover } = useCurrentUserMutator()

    return useMutation(UserApi.updateCover,
        {
            onMutate() {
                return {
                    hide: message.loading('Uploading Cover Image')
                }
            },

            onSuccess(cover_url) {
                successMessage('Cover image updated successfully')
                setCover(cover_url)
            },

            onError() {
                message.error('Failed to update cover image')
            },

            onSettled(_data, _error, _var, ctx){
                ctx.hide()
            }
        }
    )
}