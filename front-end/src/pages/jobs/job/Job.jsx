import { Link } from 'react-router-dom'

import Shadow from '/src/components/shadow'
import Divider from '/src/components/divider'

export default function Job() {
    return (
        <Shadow className="bg-white p-3 pt-6 rounded">
            <img className="block h-[90px] w-[90px]" src="http://prototype-alspace.herokuapp.com/images/company1.jpg"/>
            <Link to="/jobs/1" className="block font-bold text-lg">Marketing Officer</Link>
            <div className="text-gray-700 font-light">Organica Nutraceuticals Inc.</div>
            <div className="text-sm text-gray-500 font-light">Quezon City, National Capital Region, Philippines</div>
            <Divider className="my-2"/>
            <div className="flex justify-between">
                <div className="text-sm text-gray-500">3 days ago</div>
                <div className="text-sm text-gray-500">Posted by: Lenard Mangay-ayam</div>
            </div>
        </Shadow>
    )
}