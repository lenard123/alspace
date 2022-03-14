import Avatar from '/src/components/avatar'

export default () => (
    <div className="flex gap-3 hover:bg-gray-50 py-2">
        <Avatar name="Lenard Mangay-ayam"/>
        <div className="flex flex-col">
            <span className="text-gray-700"><strong>Lenard Mangay-ayam</strong> commented on your post.</span>
            <span className="text-gray-500 text-sm">5 hours ago</span>
        </div>
    </div>
)