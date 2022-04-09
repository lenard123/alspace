
export default {
    posts: ['posts'],
    post: (id) => ['posts', id.toString()],
    postComments: (postId) => ['posts', postId.toString() ,'comments'],
    commentReplies: (commentId) => ['comments', commentId.toString(), 'replies'],
    currentUser: ['users', 'current'],
    conversations: ['conversations'],
    conversation: (threadId) => ['conversations', threadId.toString()],
    conversationMessages: (threadId) => ['conversations', threadId.toString(), 'messages'],
    threadWith: (userId) => ['users', userId.toString(), 'thread']
}