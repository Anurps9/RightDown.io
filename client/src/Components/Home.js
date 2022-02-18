import { useContext, useState } from 'react'
import cookie from 'react-cookies'
import { AuthContext } from '../Context/AuthContext'
import { socket, SocketContext } from '../Context/SocketContext'
import Canvas from './Canvas'
import paper from 'paper'

export default function Home(){
    const {user, setUser} = useContext(AuthContext)  

    const handleClick = () => {
        cookie.remove('userId')
        setUser(null)
    }
    return (
        <div>
            <SocketContext.Provider value={socket}>
                    <Canvas />
            </SocketContext.Provider>
        </div>
    )
}