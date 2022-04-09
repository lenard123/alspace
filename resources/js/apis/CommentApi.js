import Http, { requestCookie } from "../utils/Http"

export const likeComment = async (commentId) => {
    await requestCookie()
    return await Http.post(`/comments/${commentId}/like`);
}

export const unlikeComment = async (commentId) => {
    await requestCookie()
    return await Http.post(`/comments/${commentId}/unlike`);
}

export const fetchReplies = async (commentId, page) => {
    await requestCookie()
    return await Http.get(`/comments/${commentId}/replies`, {
        params: {page}
    });
}

export const replyOnComment = async (commentId, content) => {
    await requestCookie()
    return await Http.post(`/comments/${commentId}/replies`, {content})
}