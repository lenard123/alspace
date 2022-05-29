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

export const fetchAlumni = async({ query, page }) => {
    await requestCookie()
    return await Http.get(`/users/alumni`, {
        params: {
            query: query || undefined,
            page: page || 1
        }
    })
}

export const approveUser = async (pendingUserId) => {
    await requestCookie()
    return await Http.post(`/users/pending/${pendingUserId}`)
}

export const fetchWorks = async (user_id) => {
    await requestCookie()
    return await Http.get(`/users/${user_id}/works`)
}

export const updateAvatar = async (avatar) => {
    const data = new FormData()
    data.append('avatar', avatar)
    data.append('_method', 'PATCH')
 
    await requestCookie()
    return await Http.post('/user/avatar', data)
}

export const updateCover = async (data) => {
    data.append('_method', 'PATCH')
    await requestCookie()
    return await Http.post('/user/info/cover', data)
}