
//The plus sign ensures that the id is integer
//Since sometimes the source is the url params

export default {

    jobs: ['jobs'],

    posts: ['posts'],

    post: (id) => ['posts', +id],

    postComments: (postId) => ['posts', +postId ,'comments'],

    commentReplies: (commentId) => ['comments', +commentId, 'replies'],

    currentUser: ['users', 'current'],

    user: (userId) => ['users', +userId],

    userPosts: (userId) => ['users', +userId, 'posts'],

    pendingUsers: (page) => ['users', 'pending', {page}],

    alumniUsers: (filter) => ['users', 'alumni', filter],

    alumniWorks: (alumnusId) => ['users', 'alumni', +alumnusId, 'works'],

    pendingUsersAll: ['users', 'pending'],

    threads: ['threads'],

    thread: (threadId) => ['thread', +threadId],

    threadMessages: (threadId) => ['thread', +threadId, 'messages'],

    threadWith: (userId) => ['users', +userId, 'thread'],

    supportThreads: ['threads', 'support'],

    events: (filter) => ['events', filter],

    event: (eventId) => ['events', +eventId],

    eventParticipants: (eventId, type) => ['events', +eventId, type],

    notifications: (filter = null) => ['notifications', {filter}]
}