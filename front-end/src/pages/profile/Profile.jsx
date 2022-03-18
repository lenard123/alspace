import './profile.css'
import Avatar from '/src/components/avatar'
import Feed from '/src/components/feed'
import Cover from '/assets/cover.png'

export default function Profile() {
    return (
        <div>
            <div className="cover">
                <img className="bg-gray-100 h-full w-full cover-img" src={Cover}/>
                <Avatar className="profile-picture" size="120px" src="https://avatars.dicebear.com/api/initials/Lenard+Mangay-ayam.svg" />
            </div>


            <div className="mt-[60px] text-center">
                <h4 className="text-xl font-bold">Lenard Mangay-ayam</h4>
                <span className="text-gray-700">Hello there!!</span>
            </div>

            <div className="grid grid-cols-9">
                <Feed className="col-span-6"/>
            </div>

        </div>
    )
}