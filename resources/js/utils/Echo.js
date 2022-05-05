import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
import Http from './Http';

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
    broadcaster: window.BROADCASTER,
    key: window.PUSHER_APP_KEY,
    cluster: window.PUSHER_APP_CLUSTER,
    wsHost: window.PUSHER_APP_HOST || undefined,
    wsPort: window.PUSHER_APP_PORT || undefined,
    forceTLS: false,
    encrypted: true,
    authorizer,
    disableStats: true,
})

// Pusher.logToConsole = true

Http.interceptors.request.use((config) => {
    config.headers['X-Socket-ID'] = EchoClient.socketId() // Echo instance
    return config
})

export default EchoClient