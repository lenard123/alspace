import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"


const LoadingPage = () => {
    return (
        <div className='flex-grow grid place-items-center'>
            <Spin 
                tip='Fetching Information'
                indicator={<LoadingOutlined style={{fontSize: '48px'}} spin/>}
            />
        </div>
    )
}

export default LoadingPage