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
        <>
            <Topbar/>
            <div className="flex">
                <Leftbar/>
                <div className="w-5/12 p-5">
                    <Shadow>
                        <PostComponent />

                        <Divider />

                        {/* Comments */}
                        <div className="flex flex-col bg-white p-3 gap-4">
                            <Comment/>
                            <Comment/>
                        </div>

                        <Divider />

                        <WriteComment />

                    </Shadow>

                </div>
            </div>
        </>
    )
}