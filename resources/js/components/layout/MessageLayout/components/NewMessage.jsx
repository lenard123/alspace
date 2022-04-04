import { fetchThreadWith, searchUser } from "@/js/apis/UserApi";
import useApi from "@/js/hooks/useApi";
import useThreadsAction from "@/js/recoil/actions/useThreadsAction";
import { Avatar, Form, Input, List, Modal, Spin } from "antd";
import { debounce  } from 'lodash'
import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useSearchUser from "./useSearchUser";

export default function NewMessage({ isOpen, setIsOpen })
{
    const { suggestions, searching, handleSearch } = useSearchUser()
    const { execute, isLoading, status, data } = useApi(fetchThreadWith)
    const { setThreads } = useThreadsAction()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'success') {
            console.log(data)
            setThreads([data])
            navigate(`/messages/${data.id}`)
            setIsOpen(false)
        }
    }, [status])

    const findThread = (userId) => {
        execute(userId)
    }

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
            <Spin spinning={isLoading}>
                <Form layout="inline" className='w-full'>
                    <Form.Item style={{flexWrap: 'nowrap'}} className="w-full px-4 py-2 border-b border-gray-200 mb-0" colon={false} label={<span className='font-bold'>To:</span>}>
                        <Input onChange={handleSearch} className='flex-none' placeholder='Search...' bordered={false}/>
                    </Form.Item>
                </Form>

                <div className='p-4'>
                    <span className='block font-semibold'>Suggestions</span>
                    <List
                        loading={searching}
                        dataSource={suggestions}
                        renderItem={user => (
                            <List.Item>
                                <div onClick={() => findThread(user.id)} className='cursor-pointer flex gap-4'>
                                    <Avatar src={user.avatarUrl} />
                                    <span>{user.fullname}</span>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Spin>

        </Modal>
    )
}