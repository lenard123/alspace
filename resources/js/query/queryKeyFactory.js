
export default {

    jobs: ['jobs'],

    posts: ['posts'],

    post: (id) => ['posts', Number(id)],

    postComments: (postId) => ['posts', Number(postId) ,'comments'],

    commentReplies: (commentId) => ['comments', Number(commentId), 'replies'],

    currentUser: ['users', 'current'],

    user: (userId) => ['users', Number(userId)],

    userPosts: (userId) => ['users', Number(userId), 'posts'],

    pendingUsers: (page) => ['users', 'pending', {page}],

    alumniUsers: (page) => ['users', 'alumni', {page}],

    alumniWorks: (alumnusId) => ['users', 'alumni', +alumnusId, 'works'],

    pendingUsersAll: ['users', 'pending'],

    threads: ['threads'],

    thread: (threadId) => ['thread', Number(threadId)],

    threadMessages: (threadId) => ['thread', Number(threadId), 'messages'],

    threadWith: (userId) => ['users', Number(userId), 'thread'],

    supportThreads: ['threads', 'support'],

    events: (filter) => ['events', filter],

    event: (eventId) => ['events', Number(eventId)],

    eventParticipants: (eventId, type) => ['events', Number(eventId), type],

    notifications: (filter = null) => ['notifications', {filter}]
}