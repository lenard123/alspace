import Job from './job'

export default function Jobs()
{
    return (
        <div className="grid grid-cols-9">
            <div className="col-span-5 p-5">
                <div className="flex flex-col gap-5">
                    <Job/>
                    <Job/>
                    <Job/>
                </div>
            </div>
        </div>
    )
}