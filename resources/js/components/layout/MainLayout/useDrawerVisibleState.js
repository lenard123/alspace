import { atom, useRecoilState } from "recoil";

const isDrawerVisibleState = atom({
    key: 'mainlayout.isDrawerVisible',
    default: false
})

export default function useDrawerVisibleState() 
{
    return useRecoilState(isDrawerVisibleState)
}