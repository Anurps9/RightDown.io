import { useContext } from 'react'
import cookie from 'react-cookies'
import { AuthContext } from '../Context/AuthContext'
import { socket, SocketContext } from '../Context/SocketContext'
import Canvas from './Canvas'
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