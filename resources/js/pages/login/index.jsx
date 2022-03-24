import './login.css'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="flex text-gray-700 bg-white">
            <div className="w-1/2">
                <div className="flex flex-col justify-center w-1/2 h-full mx-auto">
                    <div className="flex flex-col p-6 pb-0">
                        <span className="font-bold text-2xl">Sign In</span>
                        <p className="mt-2 text-gray-600">Enter your email and password to sign in</p>
                    </div>

                    <div className="flex flex-col p-6 pb-0 gap-4">
                        <input type="text" className="form-input" placeholder="Student Number" />
                        <input type="password" className="form-input" placeholder="Password"/>

                        <label className="flex items-center font-light gap-3">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <Link to="/" className="text-center bg-blue-500 text-white font-bold py-3 rounded-md hover:shadow-lg">Sign In</Link>
                    </div>

                    <div className="text-center text-sm mt-4">
                        <p>Don't have an account? <Link to='/register' className="text-blue-500">Sign up</Link></p>
                    </div>

                </div>
            </div>

            <div className="w-1/2 h-screen p-5">
                <div className="rightside">
                    <div className="rightside-mask"></div>
                    <h4 className="relative text-white font-bold text-2xl my-5">"Attention is the new currency"</h4>
                    <p className="text-white relative text-center">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                </div>
            </div>

        </div>
    )
}