import Avatar from '/src/components/avatar'

export default function Comment() {
    return (
        <div className="flex gap-3">
            <Avatar src="https://avatars.dicebear.com/api/initials/Lenard+Mangay-ayam.svg" />
            <div className="w-full flex flex-col">
                <div className="rounded-md bg-gray-100 p-2 flex flex-col">
                    <span className="font-bold text-gray-700">Lenard Mangay-ayam</span>
                    <p className="text-gray-800 font-light">lorem ipsum dolor sit amet</p>
                </div>
                <span className="font-light text-gray-600 text-sm">23 hours ago</span>
            </div>
        </div>
    )
}