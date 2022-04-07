const CONFIGURATION = Object.freeze({
    'API_URL': '/api'
})

const config = (key, fallback = null) => {
    return CONFIGURATION[key] || fallback
}

export default config