import { MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Helmet } from 'react-helmet'

export default (
    <>
        <Helmet>
            <title>Messages</title>
        </Helmet>
        <div className='hidden md:flex h-full text-gray-400 flex-col items-center justify-center'>
            <span className='text-6xl'><MessageOutlined /></span>
            <span className='text-xl mt-4'>Your Messages</span>
            <span>Send a private message to others.</span>
            <Button shape='round' type='primary' className='mt-4'>Send Message</Button>
        </div>
    </>
)
