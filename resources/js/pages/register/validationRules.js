export default {

    email: [
        { required: true, message: 'Please enter your email' },
        { type: 'email', message: 'Please enter a valid email' }
    ],

    firstname: [
        { required: true, message: 'Please enter your firstname' },
        { min:2, message: 'Please enter a valid name' },
        { pattern: /^[a-z ,.'-]+$/i, message: 'Please enter a valid name' }
    ],

    lastname: [
        { required: true, message: 'Please enter your lastname' },
        { min:2, message: 'Please enter a valid name' },
        { pattern: /^[a-z ,.'-]+$/i, message: 'Please enter a valid name' }
    ],

    course: [
        { required: true, message: 'Please select your course' }
    ],

    year_graduated: [
        { required: true, message: 'Please enter the year you graduated'},
    ],

    password: [
        { required: true, message: 'Password is required.' },
        { min: 8, message: 'Password must be atleast 8 characters.'},
        { pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{0,}$/, message: 'Password must contain letter and a number.' } //Must have letter and number
    ],

    password_confirmation: [
        { required: true, message: 'Please confirm your password.' },
        ({ getFieldValue  }) => ({
            validator: async(_, value) => {
                if (!value || getFieldValue('password') === value) {
                    return
                }
                throw new Error('The two password you entered does not match')
            }
        })
    ]
}