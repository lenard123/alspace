import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'

const titleState = atom({
    key: 'pageTitle',
    default: 'Alspace'
})

export default function useSetTitle(initTitle = null) {

    const [title, setTitle] = useRecoilState(titleState)

    useEffect(() => {
        if (initTitle) setTitle(initTitle)
    }, [initTitle])

    useEffect(() => {
        document.title = title +' | Alspace'
    }, [title])

    return setTitle
}