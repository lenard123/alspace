import Topbar from '/src/components/topbar'
import Leftbar from '/src/components/leftbar'
import PostComponent from '/src/components/post'
import Divider from '/src/components/divider'
import Avatar from '/src/components/avatar'
import Shadow from '/src/components/shadow'
import WriteComment from './write-comment'
import Comment from './comment'

export default function Post() {
    return (
        <div className="grid grid-cols-9">
            <div className="col-span-5 p-5">
                <Shadow>
                    <PostComponent />

                    <Divider />
                    <div className="flex flex-col bg-white p-3 gap-4">
                        <Comment/>
                        <Comment/>
                    </div>

                    <Divider />

                    <WriteComment />

                </Shadow>
            </div>
        </div>
    )
}