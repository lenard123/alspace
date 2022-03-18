import { Link } from 'react-router-dom'

export default function ({ icon, title, to='#', onClick }) 
{
    return (
        <Link onClick={onClick} to={to} className='flex gap-4 items-center hover:bg-gray-200 pl-4 py-2 text-base'>
            { icon }
            <span>{ title }</span>
        </Link>
    )
}