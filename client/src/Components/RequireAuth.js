import { useContext } from "react"
import Login from "./Login"
import { AuthContext } from "../Context/AuthContext"

export default function RequireAuth(props){
    const {user, setUser} = useContext(AuthContext)
    return(
        true 
        ?
        props.children
        :
        <Login />
    )
}