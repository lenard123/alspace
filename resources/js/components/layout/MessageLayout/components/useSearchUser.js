import { searchUser } from "@/js/apis/UserApi";
import useApi from "@/js/hooks/useApi";
import { debounce  } from 'lodash'
import { useMemo, useEffect, useState } from 'react'

const useSearchUser = () => {
    const [suggestions, setSuggestions] = useState([])

    const { execute, isLoading, status, data } = useApi(searchUser)

    const findUser = (e) => {
        if (e.target.value.trim().length > 0) {
            execute(e.target.value)
        }
    }

    const handleSearch = useMemo(() => debounce(findUser, 300), [])

    useEffect(() => {
        if (status === 'success') {
            setSuggestions(data)
            console.log(data)
        }
    }, [status])

    useEffect(() => {
        return () => {
            handleSearch.cancel()
        }
    }, [])

    return {
        suggestions,
        handleSearch,
        searching: isLoading
    }
}

export default useSearchUser