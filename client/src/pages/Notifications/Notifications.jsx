import { Button } from 'antd'
import { DotsHorizontalOutlined } from '/src/components/icons'

export default function ()
{
    return (
        <div className='max-w-lg mx-auto sm:rounded-lg bg-white my-4 border border-gray-300 p-8'>
            <div className="flex justify-between">
                <div className="font-bold text-xl sm:text-2xl text-gray-700">Notifications</div>
                <Button type='text' icon={<DotsHorizontalOutlined />} />
            </div>
        </div>
    )
}