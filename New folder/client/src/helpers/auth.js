import cookie from 'js-cookie'

//set in cookiees
export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, { 
            expires: 1 //in 1 day
        })
    }
}

//remove cookie
export const removeCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.remove(key, { 
            expires: 1 //in 1 day
        })
    }
}

//get from cookie like tokens
export const getCookie = key => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

//Set in local storage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from local storage
export const removeLocalStorage = key => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//auth user after login
export const authenticate = (responce, next) => {
    setCookie('token', responce.data.token)
    setLocalStorage('user', responce.data.token)
    next()
}

//get user info from localStorage
export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token')

        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else {
                return false
            }
        }
    }
    
}

//update user data in local storage
export const updateUser = (response, next) => {
    if(window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}