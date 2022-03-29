const getFallback = (fallback) => {
    return typeof fallback === 'function' ? fallback() : fallback;
}

const hasExpired = (expiration) => {
    if (expiration) {
        const remainingTime = expiration - Date.now()
        return remainingTime < 0
    }
    return false
}

const get = function(key, fallback) {
    const cache = JSON.parse(localStorage.getItem(key))

    //No cache
    if (!cache || typeof cache !== 'object') return getFallback(fallback);

    //Extract data
    const { value, expiration } = cache

    //Check if expired
    if (hasExpired(expiration)) return getFallback(fallback)

    return value;
}

const set = function(key, value, ttl = null) {
    let expiration = ttl === null ? null : Date.now() + ttl;
    const cache = JSON.stringify({value, expiration})
    localStorage.setItem(key, cache)
    return value
}

const remove = function(key, value) {
    localStorage.removeItem(key)
    return value
}

export default {
    get,
    set,
    remove
}