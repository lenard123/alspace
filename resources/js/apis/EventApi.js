import Http, { requestCookie } from "../utils/Http"

export const createEvent = async(data) => {
    //console.log(data); return;
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

export const addToInterested = async(eventId) => {
    await requestCookie();
    return await Http.post(`/events/${eventId}/participants`);
}

export const cancelParticipation = async(eventId) => {
    await requestCookie();
    return await Http.delete(`/events/${eventId}/participants`)
}