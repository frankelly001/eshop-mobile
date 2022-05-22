export const formatStr = (str) => {
    return str.replace(/\s+$/, '').replace(/[^A-Z0-9/.']+/ig, "-").replace(/[^A-Z0-9-.']+/ig, '\'')
}