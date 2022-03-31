export { default as Http } from './Http'
export { default as Cache } from './Cache'

export const arrayKeyBy = (array, key) => {
    return array.reduce((acm, item) => {
        if (item[key])
            return {...acm, [item[key]]: item}
        return acm
    }, {})
}

export const arrayPluck = (array, key) => {
    const result = []
    array.forEach(element => {
        if(element[key]) result.push(element[key]);
    })
    return result
}

export const arrayPluckAndExclude = (array, key) => {
    return [
        arrayPluck(array, key), 
        array.map(({[key]:_, ...element}) => element)
    ]
}

//Add loading object to array if isLoading
export const arrayIsLoading = (array, isLoading = false, count = 3) => {
    if (!isLoading) return array
    return [...array, ...Array(count).fill({isLoading: true})]
}