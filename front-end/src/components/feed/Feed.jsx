import WritePost from './write-post'
import Post from '/src/components/post'
import Shadow from '/src/components/shadow'

export default function Feed(props) {
    return (
        <div { ...props}>
            <div className="p-5 flex flex-col gap-5">
                <WritePost />

                <Shadow>
                    <Post />
                </Shadow>
                <Shadow>
                    <Post />
                </Shadow>
                <Shadow>
                    <Post />
                </Shadow>

            </div>
        </div>
    )
}