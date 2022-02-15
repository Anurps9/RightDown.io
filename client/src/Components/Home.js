import { useContext } from 'react'
import cookie from 'react-cookies'
import { AuthContext } from '../Context/AuthContext'
export default function Home(){
    const {user, setUser} = useContext(AuthContext)
    const handleClick = () => {
        cookie.remove('userId')
        setUser(null)
    }
    return (
        <div>
            This is the homepage.
            <br/>
            <button type="button" onClick={handleClick}>Logout</button>
        </div>
    )
}