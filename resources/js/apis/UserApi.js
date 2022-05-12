import Http, { requestCookie } from '@/js/utils/Http'

export const fetchThreads = async() => {
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
    return await Http.get(`/users/pending?page=${page}`)
}

export const fetchAlumni = async(page = 1) => {
    await requestCookie()
    return await Http.get(`/users/alumni?page=${page}`)
}

export const approveUser = async (pendingUserId) => {
    await requestCookie()
    return await Http.post(`/users/pending/${pendingUserId}`)
}

export const fetchWorks = async (alumnus_id) => {
    await requestCookie()
    return await Http.get(`/users/${alumnus_id}/works`)
}