
export default {

    posts: ['posts'],

    post: (id) => ['posts', Number(id)],

    postComments: (postId) => ['posts', Number(postId) ,'comments'],

    commentReplies: (commentId) => ['comments', Number(commentId), 'replies'],

    currentUser: ['users', 'current'],

    conversations: ['conversations'],

    conversation: (threadId) => ['conversations', Number(threadId)],

    conversationMessages: (threadId) => ['conversations', Number(threadId), 'messages'],

    threadWith: (userId) => ['users', Number(userId), 'thread'],

    events: (filter) => ['events', {filter}],

    event: (eventId) => ['events', Number(eventId)],

    eventParticipants: (eventId, type) => ['events', Number(eventId), type],
}