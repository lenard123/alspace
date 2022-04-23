import Http, { requestCookie } from '@/js/utils/Http'

export const fetchThread = async(threadId) => {
    await requestCookie()
    return await Http.get(`/threads/${threadId}`)
}

export const fetchMessage = async(threadId, page = null) => {
    await requestCookie()
    return await Http.get(`/threads/${threadId}/messages`, {
        params: {page}
    })
}

export const sendMessage = async(threadId, content) => {
    await requestCookie()
    return await Http.post(`/threads/${threadId}`, {content})
}

export const readMessage = async(messageId) => {
    await requestCookie()
    return await Http.put(`/messages/${messageId}`)
}