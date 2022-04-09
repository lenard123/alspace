
export const updatePagination = (newData) => {
    return (pagination) => {
        if (!pagination) return {
            pages: [ {data:[newData]}]
        }
        return {
            ...pagination,
            pages: pagination.pages.map(page => ({
                ...page,
                data: page.data.map(oldData => oldData.id === newData.id ? newData : oldData)
            }))
        }
    }
}

export const removeFromPagination = (id) => {
    return(pagination) => {
        if (!pagination) return undefined

        return {
            ...pagination,
            pages: pagination.pages.map(page => ({
                ...page,
                data: page.data.filter(oldData => oldData.id !== id)
            }))
        }
    }
}

export const prependPagination = (newData) => {
    return (pagination) => {
        if (!pagination) return {
            pages: [ {data:[newData]}]
        }
        return {
            ...pagination,
            pages: pagination.pages.map( (page, i) => ({
                ...page,
                data: i === 0 ? [newData, ...page.data] : page.data
            }))
        }
    } 
}