import Http, { requestCookie } from '@/js/utils/Http'

export const fetchConversations = async() => {
    await requestCookie()
    return await Http.get('/user/conversations')
}