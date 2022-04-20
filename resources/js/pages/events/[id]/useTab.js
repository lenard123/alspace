import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'

export default function useTab()
{
    const [params] = useSearchParams()
    const { id } = useParams()
    const navigate = useNavigate()
    const active = useMemo(() => {
        switch (params.get('tab')) {
            case 'interested':
            case 'going':
                return params.get('tab');
        }
        return 'about'
    }, [params.get('tab')]);

    const setActive = (tab) => {
        navigate(`/events/${id}?tab=${tab}`)
    }

    return [
        active,
        setActive
    ]
}