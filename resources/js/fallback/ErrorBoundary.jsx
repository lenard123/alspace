import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import PageNotFound from './PageNotFound'
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

const PAGE_NOT_FOUND = 1
const UNKNOWN_ERROR = 2

const getErrorType = (error) => {
    if (error?.response?.status === 404)
        return PAGE_NOT_FOUND

    return UNKNOWN_ERROR
}


const ErrorHandler = ({error, resetErrorBoundary}) => {
    const type = getErrorType(error)

    switch (type) {
        case PAGE_NOT_FOUND:
            return <PageNotFound />
    }
}

export default function ErrorBoundary({ children })
{
    const location = useLocation()

    return (
        <ReactErrorBoundary 
            FallbackComponent={ErrorHandler} 
            resetKeys={[location.pathname, location.search]}
        >
            { children }
        </ReactErrorBoundary>
    )
}