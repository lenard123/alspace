export default {
    email: [
        {
            required: true,
            message: 'Email is required.'
        },
        {
            type: 'email',
            message: 'Please enter a valid email.'
        }
    ],

    password: [
        {
            required: true,
            message: 'Password is required'
        }
    ]
}