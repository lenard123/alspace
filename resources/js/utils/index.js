export { default as Http } from './Http'
export { default as Cache } from './Cache'
export { default as Echo } from './Echo'

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

export const arrayDropKeys = (array, ...keys) => {
    let dropKeys = keys.reduce((acm, key) => ({...acm, [key]: []}), {})
    let newArray = array.map(element => {
        let valid = {}
        for (var key in element) {
            if (keys.some(_key => key == _key)) {
                dropKeys[key].push(element[key])                
            } else {
                valid[key] = element[key]
            }
        }
        return valid
    })
    return [newArray, dropKeys]
}

//Add loading object to array if isLoading
export const arrayIsLoading = (array, isLoading = false, count = 3) => {
    if (!isLoading) return array
    return [...array, ...Array(count).fill({isLoading: true})]
}