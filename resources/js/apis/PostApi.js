import Http, { requestCookie } from "../utils/Http"

export const createPost = async (content) => {
    await requestCookie()
    return await Http.post('/posts', {content})
}