import NotificationItem from './components/Item'

export default function Notifications() {
    return (
        <div className="py-9">
            <div className="p-9 border border-gray-300 rounded mx-auto bg-white w-2/3">
                <div className="flex justify-between">
                    <div className="font-bold text-2xl text-gray-700">Notifications</div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </button>
                </div>

                <div className="mt-4 flex gap-2">
                    <button className="bg-blue-200 text-blue-500 py-2 px-6 font-bold rounded-full text-sm">All</button>
                    <button className="bg-gray-200 text-gray-500 py-2 px-6 font-bold rounded-full text-sm">Unread</button>
                </div>

                <div className="mt-4 flex flex-col">
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </div>

            </div>
        </div>
    )
}