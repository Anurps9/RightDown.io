import { socket, SocketContext } from '../Context/SocketContext'
import Canvas from './Canvas'

export default function Home(){
    return (
        <div>
            <SocketContext.Provider value={socket}>
                    <Canvas />
            </SocketContext.Provider>
        </div>
    )
}