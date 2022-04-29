import { message } from 'antd'
import { useMutation } from 'react-query'
import { useEffect, useState } from 'react'
import { AuthApi } from '@/js/apis'
import _ from 'lodash'

const useOtp = (email) => {

    const [throttle, setThrottle] = useState(0)
    const { mutate, isLoading:sending } = useMutation(() => AuthApi.sendOTP(email), {
        onSuccess(data) {
            message.success('OTP Send successfull')
            setThrottle(60)
        },
        onError(error) {
            if (error?.response?.status === 422) {
                message.error(error.response.data.message)
            } else {
                message.error('Failed to send otp')
            }
        }
    })

    const sendOTP = () => {
        if (throttle > 0 || sending) return;
        mutate()
    }

    useEffect(() => {
        const intervel = setInterval(() => {
            setThrottle(throttle => {
                return Math.max(0, throttle - 1)
            })
        }, 1000)

        return () => {
            clearInterval(intervel)
        }
    }, [])

    return {
        sendOTP,
        sending,
        throttle
    }
}

export default useOtp