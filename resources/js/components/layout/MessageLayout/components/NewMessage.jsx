import { Avatar, Form, Input, List, Modal } from "antd";


const suggestions = [
    {
        id: 1,
        fullname: 'Lenard Mangay-ayam',
        avatar: 'https://avatars.dicebear.com/api/initials/ladeson+mastaneda.svg'
    },
    {
        id: 2,
        fullname: 'Madeson Castaneda',
        avatar: 'https://avatars.dicebear.com/api/initials/madeson+castaneda.svg'
    },
    {
        id: 2,
        fullname: 'Madeson Castaneda',
        avatar: 'https://avatars.dicebear.com/api/initials/madeson+castaneda.svg'
    },
    {
        id: 2,
        fullname: 'Madeson Castaneda',
        avatar: 'https://avatars.dicebear.com/api/initials/madeson+castaneda.svg'
    },
    {
        id: 2,
        fullname: 'Madeson Castaneda',
        avatar: 'https://avatars.dicebear.com/api/initials/madeson+castaneda.svg'
    },
    {
        id: 2,
        fullname: 'Madeson Castaneda',
        avatar: 'https://avatars.dicebear.com/api/initials/madeson+castaneda.svg'
    },
    {
        id: 2,
        fullname: 'Madeson Castaneda',
        avatar: 'https://avatars.dicebear.com/api/initials/madeson+castaneda.svg'
    },
    {
        id: 1,
        fullname: 'Lenard Mangay-ayam',
        avatar: 'https://avatars.dicebear.com/api/initials/ladeson+mastaneda.svg'
    }
]

export default function NewMessage({ isOpen, setIsOpen })
{
    return (
        <Modal
            className='new-message-modal'
            centered={true}
            visible={isOpen}
            title='New Message'
            onCancel={() => setIsOpen(false)}
            bodyStyle={{padding: 0, backgroundColor:'white'}}
            footer={false}
            >
            <Form layout="inline" className='w-full'>
                <Form.Item style={{flexWrap: 'nowrap'}} className="w-full px-4 py-2 border-b border-gray-200 mb-0" colon={false} label={<span className='font-bold'>To:</span>}>
                    <Input className='flex-none' placeholder='Search...' bordered={false}/>
                </Form.Item>
            </Form>

            <div className='p-4'>
                <span className='block font-semibold'>Suggestions</span>
                <List
                    loading={false}
                    dataSource={[]}
                    renderItem={user => (
                        <List.Item>
                            <div className='flex gap-4'>
                                <Avatar src={user.avatar} />
                                <span>{user.fullname}</span>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

        </Modal>
    )
}