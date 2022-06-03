import Http, { requestCookie } from "../utils/Http"

export const createEvent = async(data) => {
    const formData = new FormData()
    await requestCookie()
    Object.keys(data).forEach(key => {
        if (data[key]) formData.append(key, data[key])
    })

    return Http.post('/events', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const fetchEvents = async(page = 1, filter = '') => {
    await requestCookie();
    return await Http.get('/events', {
        params: { filter, page }
    })
}

export const fetchEvent = async (eventId) => {
    await requestCookie();
    return await Http.get(`events/${eventId}`)
}

export const fetchEventParticipants = async(eventId, type) => {
    await requestCookie();
    return await Http.get(`events/${eventId}/participants?type=${type}`)
}

export const addToInterested = async(eventId) => {
    await requestCookie();
    return await Http.post(`/events/${eventId}/participants`);
}

export const addToGoing = async(eventId) => {
    await requestCookie()
    return await Http.put(`/events/${eventId}/participants`)
}

export const cancelParticipation = async(eventId) => {
    await requestCookie();
    return await Http.delete(`/events/${eventId}/participants`)
}

export const approveEvents = async (eventId) => {
    const formData = new FormData()
    formData.append('_method', 'PATCH')
    await requestCookie()
    return await Http.post(`/events/${eventId}/approve`, formData)
}

export const rejectEvent = async (eventId) => {
    await requestCookie()
    return await Http.post(`/events/${eventId}/reject`, { _method: 'PATCH' })
}