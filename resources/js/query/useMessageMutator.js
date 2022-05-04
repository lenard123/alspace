import { useMutation } from "react-query"
import { ThreadApi } from "../apis"


export default function useMessageMutator()
{
    const readMessageMutator = useMutation(
        ({id}) => ThreadApi.readMessage(id),
    )

    return {
        readMessage: (id) => readMessageMutator.mutate(id)
    }
}
