import { PlusOutlined } from "@ant-design/icons"
import { Input, Tag, Tooltip } from "antd"
import { useState, useRef, useEffect } from 'react'

export default function TagsEditor({ tags, setTags }) {
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [inputValue, setInputValue] = useState('')
    const [addInputVisible, setAddInputVisible] = useState(false)
    const editInput = useRef(null)
    const addInput = useRef(null)

    useEffect(() => {
        if (editInputIndex !== -1) {
            editInput.current.focus()
        }
    }, [editInputIndex])

    useEffect(() => {
        if (addInputVisible) {
            addInput.current.focus()
        }
    }, [addInputVisible])

    const handleInputConfirm = () => {

        let newTag = inputValue.trim()

        const existing_tag = tags.findIndex(tag => tag === newTag)

        if (existing_tag != -1 && existing_tag !== editInputIndex) return

        if (editInputIndex != -1) {
            setTags(tags => tags.map((oldTag, i) => {
                if (i === editInputIndex && newTag != '') return newTag
                return oldTag
            }))
        } else {
            if (newTag != ''){
                setTags(tags => [...tags, newTag])
            }
        }

        setEditInputIndex(-1)
        setInputValue('')
        setAddInputVisible(false)
    }

    const removeTag = (tag) => {
        setTags(tags => {
            return tags.filter(oldTag => oldTag !== tag)
        })
        setEditInputIndex(-1)
    }

    return (
        <>
            {tags.map((tag, index) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={editInput}
                            key={tag}
                            size='small'
                            className='tag-input'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                    )
                }

                const isLongTag = tag.length > 20;

                const tagElement = (
                    <Tag
                        color='cyan'
                        className='edit-tag'
                        key={tag}
                        onClose={() => removeTag(tag)}
                        closable={true}
                    >
                        <span
                            onDoubleClick={e => {
                                setEditInputIndex(index)
                                setInputValue(tag)
                                setAddInputVisible(false)
                            }}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                    </Tag>
                )

                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        tagElement
                    </Tooltip>
                ) : tagElement
            })}

            {addInputVisible
                ? (
                    <Input
                        ref={addInput}
                        size='small'
                        className='tag-input'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                )
                : (
                    <Tag color='cyan' className="site-tag-plus" onClick={() => setAddInputVisible(true)}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )
            }
        </>
    )
}