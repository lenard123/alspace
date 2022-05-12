export default {
    'company': [
        { required: true, message: 'Please enter the company name.' },
    ],
    'position': [
        { required: true, message: 'Please enter your job title' }
    ],
    'start_at': [
        { required: true,  message: 'This field is required'},
        ({ getFieldValue }) => ({
            async validator(_, value) {
                const end_at = getFieldValue('end_at')
                if(!value || !end_at || value <= end_at) return;

                throw new Error('Start Date can\'t be later than end date')
            }
        })
    ],
    'end_at': [
        ({ getFieldValue }) => ({
            async validator(_, value) {
                const start_at = getFieldValue('start_at')
                if (!value || !start_at || value >= start_at) return

                throw new Error('End Date can\'t be earlier than start date')
            }
        })
    ]

}