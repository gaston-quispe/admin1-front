export const getJwt = () => {
    return localStorage.getItem("cool-jwt")
}

export const setJwt = (jwt) => {
    return localStorage.setItem("cool-jwt", jwt)
}

export const deleteJwt = () => {
    return localStorage.removeItem("cool-jwt")
}