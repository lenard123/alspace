import { Input, Button, Form, Select, DatePicker } from 'antd'
import rules from '../validationRules'
import _ from 'lodash'
import useFormValidator from './useFormValidator'
import { Link } from 'react-router-dom'

const { Option } = Select


const Form1 = ({ onFinish, className }) => {
    const { validationErrors, isLoading, validate } = useFormValidator(0, onFinish)

    let submit = (data) => {
        validate({ ...data, year_graduated: data.year_graduated.year() })
    }

    return (
        <Form className={className} layout='vertical' onFinish={submit}>
            <Form.Item
                className='mb-4'
                label='Student Number'
                name='student_id'
                hasFeedback
                rules={rules.student_id}
                tooltip='Example: 20001001-C'
                {...(validationErrors.student_id)}
            >
                <Input
                    type='text'
                    placeholder='Enter your student number here'
                    size='large'
                    className='rounded'
                />
            </Form.Item>

            <div className='flex flex-col sm:flex-row gap-x-4'>
                <Form.Item
                    rules={rules.firstname}
                    className='mb-4 flex-grow'
                    label='Firstname'
                    name='firstname'
                    hasFeedback
                    {...(validationErrors.firstname)}
                >
                    <Input
                        type='text'
                        placeholder='Enter your firstname here'
                        size='large'
                        className='rounded'
                    />
                </Form.Item>

                <Form.Item
                    rules={rules.lastname}
                    className='mb-4 flex-grow'
                    label='Lastname'
                    name='lastname'
                    hasFeedback
                    {...(validationErrors.lastname)}
                >

                    <Input
                        type='text'
                        placeholder='Enter your lastname here'
                        size='large'
                        className='rounded'
                    />
                </Form.Item>

            </div>

            <Form.Item
                name='course'
                label='Course'
                className='mb-4'
                rules={rules.course}
                hasFeedback
            >
                <Select size='large' placeholder='Select course'>
                    <Option value="bscs">BSCS</Option>
                    <Option value="bsis">BSIS</Option>
                    <Option value="bsit">BSIT</Option>
                    <Option value="bsemc">BSEMC</Option>
                </Select>
            </Form.Item>

            <Form.Item
                className='mb-4'
                name='year_graduated'
                label='Year Graduated'
                rules={rules.year_graduated}
                hasFeedback
            >
                <DatePicker
                    disabledDate={currentDate => {
                        const year = currentDate.year()
                        const start = 1990
                        const end = moment().year()
                        return year < start || year > end
                    }}
                    className='w-full'
                    size='large'
                    picker='year'
                />
            </Form.Item>

            <div className='flex justify-between mb-4'>
                <Link className='link' to='/login'>Back to Login</Link>
                <Button loading={isLoading} type='primary' htmlType='submit' size='large'>Next</Button>
            </div>

        </Form>
    )
}

export default Form1
