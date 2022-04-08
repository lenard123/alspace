
export default {
    posts: ['posts'],
    post: (id) => ['posts', id.toString()],
    postComments: (postId) => ['posts', postId.toString() ,'comments'],
    commentReplies: (commentId) => ['comments', commentId.toString(), 'replies'],
    currentUser: ['users', 'current'],
}