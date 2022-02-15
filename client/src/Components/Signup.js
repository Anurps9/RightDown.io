import axios from "axios"
import cookie from 'react-cookies'
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"

export default function Signup(){
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
        .post('/user', data)
        .then((res) => {
            if(res.data == null){
                console.log('User already exists');
                return;
            }
            setUser(data.id)
            cookie.save('userId', data.id)
        })
    }

    return(
        <div>
            Signup
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
        </div>
    )
}