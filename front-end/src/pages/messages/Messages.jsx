import './messages.css'
import Avatar from '/src/components/avatar'

export default function Messages() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-8 p-4 flex flex-col messages-container">
                <div className="flex flex-col gap-3 flex-grow overflow-y-scroll messages-list">

                    {/*Received*/}
                    <div className="flex gap-3">
                        <Avatar className="self-end mb-4" src="https://avatars.dicebear.com/api/initials/Richard+Veloria.svg"/>
                        <div className="flex flex-col">
                            <div className="p-3 rounded-lg bg-white text-gray-700 max-w-[75%]">
                                lorem ipsum dolor sit amet addas acslsc acscmal acmls axamlmxa xalmlxa
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                    </div>

                    {/*Sent*/}
                    <div className="flex flex-row-reverse gap-3">
                        <Avatar className="hidden self-end mb-4" src="https://avatars.dicebear.com/api/initials/Richard+Veloria.svg"/>
                        <div className="flex flex-col items-end">
                            <div className="p-3 rounded-lg bg-blue-500 text-white text-gray-700 max-w-[75%]">
                                lorem ipsum dolor sit amet addas acslsc acscmal acmls axamlmxa xalmlxa
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                    </div>

                </div>
                <div className="flex pt-2 gap-3">
                    <textarea 
                        className="text-sm text-gray-700 focus:outline-none focus:border-blue-500 rounded-full flex-grow p-3 rounded border border-gray-300" 
                        placeholder="Write a message"
                    ></textarea>
                    <button className="bg-blue-500 text-white self-start py-2 px-4 text-sm font-bold text-gray-700 rounded">Send</button>
                </div>
            </div>
        </div>
    )
}