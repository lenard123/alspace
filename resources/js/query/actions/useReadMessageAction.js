import { useMutation } from "react-query"
import { ThreadApi } from "../../apis"


export default function useReadMessageAction()
{
    return useMutation(
        ({id}) => ThreadApi.readMessage(id),
    )
}
