import { Avatar, Image, Tabs } from "antd";

export default function ProfilePage() {
    return (
        <>

            <div className='bg-white border-b border-gray-300'>
                <Image
                    width='100%'
                    height='min(300px, 60vw)'
                    className='object-cover'
                    src='https://res.cloudinary.com/djasbri35/image/upload/v1649750683/alspace/events/aghom7lqat9harfvaaqv.png'
                />

                <div className='page-wrapper'>
                    <div className='-mt-[60px]'>
                        <div className='flex items-end gap-4'>
                            <Avatar
                                className='border-2 border-white'
                                src='https://avatars.dicebear.com/api/initials/lenard+mangay-ayam.svg'
                                size={120}
                            />

                            <div className='pb-2'>
                                <div className='text-3xl font-bold text-gray-800'>Lenard Mangay-ayam</div>
                            </div>
                        </div>
                    </div>

                    <Tabs size='large' tabBarStyle={{margin: 0}}>
                        <Tabs.TabPane key={1} tab='Posts' />
                        <Tabs.TabPane key={2} tab='About' />
                        <Tabs.TabPane key={3} tab='Jobs' />
                    </Tabs>

                </div>
            </div>

            
        </>
    )
}