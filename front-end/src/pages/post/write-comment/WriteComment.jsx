import Avatar from '/src/components/avatar'

export default function WriteComment()
{
    return (
        <div 
            className="bg-white p-3 flex gap-3"
            >
            <Avatar src="https://avatars.dicebear.com/api/initials/Lenard+Mangay-ayam.svg" />
            <textarea className="w-full min-h-[48px] h-[48px] focus:h-[72px] focus:outline-none rounded-md border border-gray-200 p-2" placeholder="Write a comment"></textarea>
            <button className="self-start border border-gray-200 text-sm text-gray-600 px-5 py-2">Post</button>
        </div>
    )
}
