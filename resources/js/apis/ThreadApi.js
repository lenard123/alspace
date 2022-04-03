import Http, { requestCookie } from '@/js/utils/Http'

export const fetchThread = async(threadId) => {
    await requestCookie()
    return await Http.get(`/threads/${threadId}`)
}

export const sendMessage = async(threadId, content) => {
    await requestCookie()
    return await Http.post(`/threads/${threadId}`, {content})
}