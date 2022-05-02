import Http, { requestCookie } from '@/js/utils/Http'

export const fetchConversations = async() => {
    await requestCookie()
    return await Http.get('/user/conversations')
}

export const searchUser = async(query) => {
    await requestCookie()
    return await Http.get('/users/search', {params: {query}})
}

export const fetchThreadWith = async(userId) => {
    await requestCookie()
    return await Http.get(`/users/${userId}/thread`);
}

export const fetchUserPosts = async (userId, page = 1) => {
    await requestCookie()
    return await Http.get(`/users/${userId}/posts?page=${page}`)
}

export const fetchUser = async(userId) => {
    await requestCookie()
    return await Http.get(`/users/${userId}`);
}

export const fetchPendingUsers = async (page = 1) => {
    await requestCookie()
    return await Http.get(`/admin/users/pending?page=${page}`)
}