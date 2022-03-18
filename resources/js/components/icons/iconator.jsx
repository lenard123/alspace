import Icon from '@ant-design/icons'

export default (svgIcon, props) => {
    const _icon = () => svgIcon

    return <Icon component={_icon} {...props} />
}