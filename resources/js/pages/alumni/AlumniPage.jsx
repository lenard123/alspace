import useAlumniQuery from "@/js/query/queries/useAlumniQuery";
import { Input } from "antd";
import ProfileCard from "./components/ProfileCard";


export default function AlumniPage() {

    const { data, isLoading } = useAlumniQuery()

    if (isLoading) return "Loading"

    const { data: alumni, total } = data

    return (
        <>
            <div className='bg-white px-4 sm:px-8'>
                <div className='px-0 max-w-screen-lg  mx-auto header-height flex items-center'>

                    <div className='flex items-center'>
                        <span className='font-bold text-gray-700 text-lg flex-shrink-0'>CSD Alumni</span>
                        <span className='ml-8 flex-shrink-0'>{total} Total</span>
                        <Input
                            className='ml-4 rounded bg-gray-100 hover:bg-gray-100 focus:bg-gray-100'
                            bordered={false}
                            placeholder='Search...'
                        />
                    </div>
                </div>
            </div>

            <div className='mt-4 page-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {alumni.map(alumnus => (
                    <ProfileCard key={alumnus.id} {...alumnus}/>
                ))}
            </div>
        </>
    )
}