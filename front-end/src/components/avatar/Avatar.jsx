const sizes = {
    'sm': '42px',
    'md': '48px'
};

const Avatar = function({ src, size, className }) {
    return (
        <img 
            style={{ 
                'height': sizes[size],
                'width': sizes[size]
            }}
            className={`rounded-full ${className}`} 
            src={src} 
        />
    )
}

Avatar.defaultProps = {
    size: 'md',
    className: ''
}

export default Avatar;