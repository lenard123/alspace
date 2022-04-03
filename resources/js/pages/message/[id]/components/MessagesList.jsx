import authState from "@/js/recoil/states/authState"
import { useRecoilValue } from "recoil"
import moment from 'moment'

export default function MessagesList({messages}) {

    const { currentUserId } = useRecoilValue(authState)

    return (
        <>
        {
            messages.map(message => {
                const isOwn = message.user_id === currentUserId
                return (
                    <div key={message.id} className={`flex flex-col m-3 ${isOwn ? 'items-end' : 'items-start'}`}>
                        <div
                            className='rounded-lg shadow'
                            style={{
                                backgroundColor: isOwn ? '#38BDF8' : '#E5E5E5',
                                color: isOwn ? '#fff' : '#000',
                                maxWidth: '60%',
                                padding: '8px 12px',
                            }}>
                            {message.content}
                        </div>
                        <span className='text-xs'>{moment(message.created_at).fromNow()}</span>
                    </div>
                )
            })
        }
        </>
    )

}