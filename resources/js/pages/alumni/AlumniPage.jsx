import useAlumniQuery from "@/js/query/queries/useAlumniQuery";
import { Empty, Input } from "antd";
import LoadingPage from "./components/LoadingPage";
import ProfileCard from "./components/ProfileCard";
import { useState } from 'react'
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

export default function AlumniPage() {

    const [query, setQuery] = useState('')
    const { data, isLoading, isFetching } = useAlumniQuery({ query })

    if (isLoading) return <LoadingPage />

    const { data: alumni, total } = data

    return (
        <>
            <div className='bg-white px-4 sm:px-8'>
                <div className='px-0 max-w-screen-lg  mx-auto header-height flex items-center'>

                    <div className='flex items-center'>
                        <span className='hidden sm:inline font-bold mr-8 text-gray-700 text-lg flex-shrink-0'>CSD Alumni</span>
                        <span className='flex-shrink-0'>{total} Total</span>
                        <Input
                            className='ml-4 rounded bg-gray-100 hover:bg-gray-100 focus:bg-gray-100'
                            bordered={false}
                            placeholder='Search...'
                            suffix={ isFetching ? <LoadingOutlined /> : <SearchOutlined />}
                            onPressEnter={e => setQuery(e.target.value.trim())}
                        />
                    </div>
                </div>
            </div>

            {alumni.length === 0 &&
                <div className='mt-4 page-wrapper'>
                    <Empty />
                </div>
            }

            <div className='mt-4 page-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {alumni.map(alumnus => (
                    <ProfileCard key={alumnus.id} {...alumnus}/>
                ))}
            </div>
        </>
    )
}