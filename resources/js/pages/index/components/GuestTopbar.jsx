import { Button } from "antd";
import { Link } from "react-router-dom";


export default function GuestTopbar() {
    return (
        <header className='sticky top-0 z-[1] w-full bg-white header-height shadow px-4'>
            {/* Container */}
            <div className='max-w-5xl mx-auto h-full flex justify-between items-center'>
                <Link to='/' className='flex gap-2 items-center'>
                    <img className='rounded' src='/images/logo.png' height='32' width='auto' />
                    <span className='font-bold text-xl'>Alspace</span>
                </Link>

                <div>
                    <Link to='/login'>
                        <Button type='link' className='text-large font-semibold text-gray-800'>Login</Button>
                    </Link>
                    <Link to='/register'>
                        <Button shape='round' type='primary'>Sign Up</Button>
                    </Link>
                </div>

            </div>

        </header>
    )
}