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