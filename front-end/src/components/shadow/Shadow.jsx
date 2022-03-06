import './shadow.css'

export default function Shadow({className, children}) {
    return (
        <div className={`custom-shadow ${className}`}>
            {children}
        </div>
    )
}