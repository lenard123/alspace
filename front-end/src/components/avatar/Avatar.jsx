const sizes = {
    'sm': '42px',
    'md': '48px',
    'lg': '54px',
    'xl': '60px',
    '2xl': '66px',
    '3xl': '72px',
    '4xl': '78px'
};

const Avatar = function({ src, size, className }) {

    const imageSize = sizes[size] || size;

    return (
        <img 
            style={{ 
                'height': imageSize,
                'width': imageSize
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