import { useState } from 'react'

export default function PostNotFoundError({ error, children })
{

    if (error?.response?.status === 404) {
        return 'i catch you'        
    }

    return children
}

// export class PostNotFoundError extends React.Component
// {
//     constructor(props) {
//         super(props)
//         this.state = { hasError: false }
//     }

//     static getDerivedStateFromError(error) {
//         return { hasError: true }
//     }

//     componentDidCatch(error, errorInfo) {    
//         // You can also log the error to an error reporting service    
//         consol.log({error, errorInfo});  
//     }

//     render() {
//         if (this.state.hasError) {
//             return 'I got you'
//         }
//         return this.props.children
//     }
// }