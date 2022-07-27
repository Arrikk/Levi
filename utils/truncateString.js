const truncateString = (str, num) => {
    if (str.length > num) {
        let subStr = str.substring(str, num);
        return subStr + "..."
    } else {
        return str
    }
}

export default truncateString;