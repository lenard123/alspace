import Logo from '/assets/logo.png'
import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

export default () => (
    <div className="bg-gray-100 min-h-screen text-gray-700">
        <header className="shadow-lg bg-white md:bg-red-500 h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img className="rounded" src={Logo} height="32" width="auto" />
                <span className="font-bold text-xl">Alspace</span>
            </div>

            <Button size='large' icon={<MenuOutlined/>} />

        </header>
        test2
    </div>
)