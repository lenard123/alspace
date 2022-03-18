
export const sleep = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms)
})

export { default as useToggler } from './useToggler'