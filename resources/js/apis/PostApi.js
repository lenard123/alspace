import Http, { requestCookie } from "../utils/Http"

export const createPost = async ({ content, files }) => {

    const formData = new FormData()
    formData.append('content', content)

    files.forEach((file, i) => formData.append(`images[${i}]`, file.originFileObj))

    await requestCookie()
    return await Http.post('/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const fetchPosts = async (page = 1) => {
    await requestCookie()
    return await Http.get('/posts', {
        params: { page }
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
    return await Http.post(`/posts/${postId}/comment`, { content })
}

export const fetchComments = async (postId, page = 1) => {
    await requestCookie()
    return await Http.get(`/posts/${postId}/comments`, {
        params: { page }
    });
}

export const deletePost = async (postId) => {
    await requestCookie()
    return await Http.delete(`/posts/${postId}`)
}
