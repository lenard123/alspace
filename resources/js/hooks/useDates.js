import moment from "moment";
import { useMemo } from 'react'

export const TODAY = moment().startOf('day')

export default function useDates(date) {
    return useMemo(() => {
        const momentInstance = moment(date)

        return {
            formatted: `${momentInstance.format('ddd, MMM DD')} at ${momentInstance.format('ha')}`,

            isToday: momentInstance.isSame(TODAY, 'd'),

            isPast: momentInstance.isBefore(TODAY, 'd'),
        }

    }, [date])
} 