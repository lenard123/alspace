const isGitpod = !!import.meta.env.VITE_ISGITPOD

const CONFIGURATION = Object.freeze({
    'API_URL': isGitpod 
        ? `https://${import.meta.env.VITE_SERVER_HOST}/api` 
        : import.meta.env.VITE_API_URL || '/api'
})

const config = (key, fallback = null) => {
    return CONFIGURATION[key] || fallback
}

export default config