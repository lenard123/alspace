import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
import Http from './Http';

const KEY = import.meta.env.VITE_APP_PUSHER_APP_KEY
const CLUSTER = import.meta.env.VITE_APP_PUSHER_APP_CLUSTER

const authorizer = (channel) => {
    return {
        authorize: (socket_id, callback) => {
            Http.post('/broadcasting/auth', { socket_id, channel_name: channel.name })
                .then(data => {
                    callback(null, data)
                })
                .catch(error => {
                    callback(new Error(`Error calling auth endpoint: ${error}`), {
                        auth: ""
                    });
                })
        }
    }
};


const EchoClient =  new Echo({
    broadcaster: 'pusher',
    key: KEY,
    cluster: CLUSTER,
    forceTLS: true,
    encrypted: true,
    authorizer
})

// Pusher.logToConsole = true

Http.interceptors.request.use((config) => {
    config.headers['X-Socket-ID'] = EchoClient.socketId() // Echo instance
    return config
})

export default EchoClient