import { useMutation } from "react-query"
import { ThreadApi } from "../apis"
import useThreadMutator from "./useThreadMutator"


export default function useMessageMutator()
{
    const { decrementUnreadCount } = useThreadMutator()

    const readMessageMutator = useMutation(
        ({id}) => ThreadApi.readMessage(id),
        {
            onMutate({thread_id}) {
                decrementUnreadCount(thread_id)
            }
        }
    )

    return {
        readMessage: (id) => readMessageMutator.mutate(id)
    }
}
