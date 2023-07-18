const Helmet = (props) => {
    document.title = "Food - " + props.title

    return props.children
}

export default Helmet