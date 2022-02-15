import axios from "axios"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
const cookie = require('react-cookies')

export default function Login(){
    const [data, setData] = useState({
        id: '',
        password: ''
    })
    const {user, setUser} = useContext(AuthContext)
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        axios
        .get(`/user/${data.id}`)
        .then((res) => {
            if(res.data == null || res.data.password !== data.password){
                console.log('User not found');
                return;
            }
            setUser(data.id)
            cookie.save('userId', data.id)
        })        
    }

    return(
        <div>
            Login
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={handleChange} type="email" value={data.email} name="id" placeholder="Email"></input>
                </div>
                <div>
                    <input onChange={handleChange} type="password" value={data.password} name="password" placeholder="Password"></input>
                </div>
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}