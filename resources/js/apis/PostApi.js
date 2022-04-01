import Http, { requestCookie } from "../utils/Http"

export const createPost = async (content) => {
    await requestCookie()
    return await Http.post('/posts', {content})
}

export const fetchPosts = async (page = 1) => {
    await requestCookie()
    return await Http.get('/posts', {
        params: {page}
    })
}

export const fetchPost = async (postId) => {
    await requestCookie()
    return await Http.get(`/posts/${postId}`)
}

export const likePost = async (postId) => {
    await requestCookie()
    return await Http.post(`/posts/${postId}/like`)
}

export const unlikePost = async (postId) => {
    await requestCookie()
    return await Http.post(`/posts/${postId}/unlike`)
}

export const commentOnPost = async (postId, content) => {
    await requestCookie()
    return await Http.post(`/posts/${postId}/comment`, {content})
}

export const deletePost = async (postId) => {
    await requestCookie()
    return await Http.delete(`/posts/${postId}`)
}
