import { searchUser } from "@/js/apis/UserApi";
import useApi from "@/js/hooks/useApi";
import { Avatar, Form, Input, List, Modal } from "antd";
import { debounce  } from 'lodash'
import { useMemo, useEffect, useState } from 'react'

export default function NewMessage({ isOpen, setIsOpen })
{
    const [suggestions, setSuggestions] = useState([])
    const { execute, isLoading, status, data } = useApi(searchUser)

    const findUser = (e) => {
        if (e.target.value.trim().length > 0) {
            execute(e.target.value)
        }
    }

    const handleSearch = useMemo(() => debounce(findUser, 300), [])

    useEffect(() => {
        if (status === 'success') {
            setSuggestions(data)
        }
    })

    useEffect(() => {
        return () => {
            handleSearch.cancel()
        }
    }, [])

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
                    <Input onChange={handleSearch} className='flex-none' placeholder='Search...' bordered={false}/>
                </Form.Item>
            </Form>

            <div className='p-4'>
                <span className='block font-semibold'>Suggestions</span>
                <List
                    loading={isLoading}
                    dataSource={suggestions}
                    renderItem={user => (
                        <List.Item>
                            <div className='flex gap-4'>
                                <Avatar src={user.avatarUrl} />
                                <span>{user.fullname}</span>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

        </Modal>
    )
}