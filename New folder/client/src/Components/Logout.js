import React from 'react'

const Logout = () => {

    const signOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <button onClick={signOut}>LogOut!</button>
    )

}

export default Logout