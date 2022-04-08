
export const updatePagination = (newData) => {
    return (pagination) => {
        if (!pagination) return
        return {
            ...pagination,
            pages: pagination.pages.map(page => ({
                ...page,
                data: page.data.map(oldData => oldData.id === newData.id ? newData : oldData)
            }))
        }
    }
}

export const prependPagination = (newData) => {
    return (pagination) => {
        if (!pagination) return;
        return {
            ...pagination,
            pages: pagination.pages.map( (page, i) => ({
                ...page,
                data: i === 0 ? [newData, ...page.data] : page.data
            }))
        }
    } 
}