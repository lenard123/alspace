
export default {
    posts: ['posts'],
    post: (id) => ['posts', id.toString()],
    postComments: (postId) => ['posts', postId.toString() ,'comments'],
    currentUser: ['users', 'current'],
}