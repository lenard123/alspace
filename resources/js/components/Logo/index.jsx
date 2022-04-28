const Logo = ({ small = false }) => (
    <div className='flex gap-2 items-center'>
        <img className='rounded' src='/images/logo.png' height={small? 16 : 32} width='auto' />
        <span className={`font-bold ${small ? 'text-md' : 'text-xl'}`}>Alspace</span>
    </div>
)

export default Logo