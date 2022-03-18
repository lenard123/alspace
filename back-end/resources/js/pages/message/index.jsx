import { useState } from 'react'
import { Avatar } from 'antd'

const Message = ({message, own}) => {
    return (
        <div className={`flex gap-3 ${own && 'flex-row-reverse'}`}>
            <Avatar className={`self-end mb-4 ${own && 'hidden'}`} src="https://avatars.dicebear.com/api/initials/Richard+Veloria.svg"/>
            <div className={`flex flex-col w-full ${own && 'items-end'}`}>
                <div className={`p-3 rounded-lg max-w-[75%] ${own ? 'bg-blue-500 text-white ml-auto' :  'bg-white text-gray-700 mr-auto'}`}>
                    { message }
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
        </div>

    )
}

let id = 1

export default function()
{
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([{
        id: id++,
        message: 'Welcome message',
        own: false
    }])

    const sendMessage = () => {
        if (message.trim().length < 1) return
        
        setMessages((messages) => {
            return [...messages, {
                id: id++,
                message,
                own: true
            }]
        })

        setMessage('') //clear message

        //Return a reply
        setTimeout(() => {
            setMessages((messages) => {
                return [...messages, {
                    id: id++,
                    message: 'Gege',
                    own: false
                }]
            })

        }, 2000)
    }

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 h-full'>
            <div className='col-span-2 p-4 flex flex-col'>
                <div className="flex flex-col gap-3 flex-grow">

                    {
                        messages.map(({id, message, own}) => (
                            <Message key={id} message={message} own={own}/>
                        ))
                    }

                </div>
                <div className="flex pt-2 gap-3">
                    <textarea 
                        value={message}
                        onChange={e=>setMessage(e.target.value)}
                        className="text-sm text-gray-700 focus:outline-none focus:border-blue-500 flex-grow p-3 rounded border border-gray-300" 
                        placeholder="Write a message"
                    ></textarea>
                    <button onClick={sendMessage} className="bg-blue-500 text-white self-start py-2 px-4 text-sm font-bold rounded">Send</button>
                </div>

            </div>
        </div>
    )
}