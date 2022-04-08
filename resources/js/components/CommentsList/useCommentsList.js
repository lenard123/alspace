
const useCommentsList = (type, id) => {

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = usePostCommentsQuery(id, {
        enabled: type === 'post'
    })

}