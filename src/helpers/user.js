/* devuelve, x ejemplo
user: {
    id: '1',
    rol: 'paciente'
}
*/
export const getUser = () => {
    return localStorage.getItem("user")
}

export const setUser = (user) => {
    return localStorage.setItem("user", user)
}

export const deleteUser = () => {
    return localStorage.removeItem("user")
}
