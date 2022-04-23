import { useMemo } from 'react'
import { useLocation, useMatch } from 'react-router'

export default function useTabs(id)
{
    const { pathname } = useLocation()

    const tabs = useMemo(() => [
        { title: 'Posts', link: `/profile/${id}` },
        { title: 'About', link: `/profile/${id}/about` },
        { title: 'Jobs', link: `/profile/${id}/jobs` },
    ], [id])

    const active = useMemo(() => {
        return tabs.find(tab => tab.link === pathname)?.title
    }, [])

    return { tabs, active }
}