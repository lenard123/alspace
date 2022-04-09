import { searchUser } from "@/js/apis/UserApi";
import useDebounce from "@/js/hooks/useDebounce";
import { Avatar, Form, Input, List, Modal, Spin } from "antd";
import { useState } from 'react'
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function NewMessage({ isOpen, setIsOpen }) {

    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 500)
    const { isLoading: searching, data: suggestions } = useQuery(
        ['users', { query: debouncedQuery }],
        () => searchUser(debouncedQuery),
        {
            enabled: query !== ''
        }
    )

    return (
        <Modal
            className='new-message-modal'
            centered={true}
            visible={isOpen}
            title='New Message'
            onCancel={() => setIsOpen(false)}
            bodyStyle={{ padding: 0, backgroundColor: 'white' }}
            footer={false}
        >
            <Form className='w-full'>
                <Form.Item className="w-full px-4 py-2 border-b border-gray-200 mb-0" colon={false} label={<span className='font-bold'>To:</span>}>
                    <Input value={query} onChange={(e) => setQuery(e.target.value)} className='flex-none w-full' placeholder='Search...' bordered={false} />
                </Form.Item>
            </Form>

            <div className='p-4'>
                <span className='block font-semibold'>Suggestions</span>
                <List
                    loading={searching}
                    dataSource={suggestions}
                    renderItem={user => (
                        <List.Item>
                            <Link onClick={() => setIsOpen(false)} to={`/messages?user_id=${user.id}`}>
                                <div className='cursor-pointer flex gap-4'>
                                    <Avatar src={user.avatarUrl} />
                                    <span>{user.fullname}</span>
                                </div>
                            </Link>
                        </List.Item>
                    )}
                />
            </div>

        </Modal>
    )
}